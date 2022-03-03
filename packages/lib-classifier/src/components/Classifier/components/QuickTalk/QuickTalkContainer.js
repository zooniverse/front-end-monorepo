import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import asyncStates from '@zooniverse/async-states'
import { getBearerToken } from '../../../../store/utils'
import { withTranslation } from 'react-i18next'

import QuickTalk from './QuickTalk'
import apiClient from 'panoptes-client/lib/api-client'
import talkClient from 'panoptes-client/lib/talk-client'

function storeMapper (stores) {
  const {
    active: subject
  } = stores.classifierStore.subjects
  
  /*
  Experimental Check
  - As of Aug 2021, this component is experimental.
  - Only show this component when explicitly enabled.
   */
  const {
    active: project
  } = stores.classifierStore.projects
  const enabled = project?.experimental_tools.includes('quicktalk')
  
  /*
  Quick Fix: use authClient to check User resource within the QuickTalk component itself
  - Long-term, app-project should be responsible for managing the User resource.
  - see https://github.com/zooniverse/front-end-monorepo/discussions/2362
   */
  const authClient = stores.classifierStore.authClient
  
  return {
    authClient,
    enabled,
    subject,
  }
}

class QuickTalkContainer extends React.Component {
  constructor () {
    super()
    
    this.state = {
      comments: [],
      authors: {},
      authorRoles: {},
      postCommentStatus: asyncStates.initialized,
      postCommentStatusMessage: '',
      userId: '',
    }
  }
  
  componentDidMount () {
    if (!this.props.enabled) return
    
    this.fetchComments()
    this.checkUser()
  }
  
  componentDidUpdate (prevProps) {
    if (!this.props.enabled) return
    
    const props = this.props
    if (props.subject !== prevProps.subject) {  // Note: this high level comparison actually works. Comparing props.subject?.id !== prevProps.subject?.id however causes a crash when getting a new subject, since prevProps.subject would have been removed from memory.
      this.fetchComments()
      this.checkUser()
    }
  }
  
  /*
  Quick Fix: use authClient to check User resource within the QuickTalk component itself
  - see https://github.com/zooniverse/front-end-monorepo/discussions/2362
   */
  async checkUser () {
    const authClient = this.props?.authClient
    if (!authClient) return
    
    const authorization = await getBearerToken(authClient)  // Check bearer token to ensure session hasn't timed out
    const user = await authClient.checkCurrent()
    this.setState({
      userId: (authorization && user) ? user.id : undefined
    })
  }
  
  fetchComments () {
    this.resetComments()
    
    const subject = this.props?.subject
    const project = subject?.project
    if (!subject || !project) {
      return
    }
    
    const section = 'project-' + project.id
    const query = {
      section: section,
      focus_id: subject.id,
      focus_type: 'Subject',
      page: 1,
      sort: 'created_at',  // PFE used '-created_at' to sort in reverse order, and I have no idea why.
    }
        
    talkClient.type('comments').get(query)
      .then (comments =>{
        this.setState({ comments })
        
        let author_ids = []
        let authors = {}
        let authorRoles = {}

        author_ids = comments.map(comment => comment.user_id)
        author_ids = author_ids.filter((id, i) => author_ids.indexOf(id) === i)
        
        apiClient.type('users').get({ id: author_ids })
          .then(users => {
            users.forEach(user => authors[user.id] = user)
            this.setState({ authors })
          })
        
        talkClient.type('roles')
          .get({
            user_id: author_ids,
            section: ['zooniverse', section],
            is_shown: true,
          })
          .then(roles => {
            roles.forEach(role => {
              if (!authorRoles[role.user_id]) authorRoles[role.user_id] = []
              authorRoles[role.user_id].push(role)
            })
            this.setState({ authorRoles })
          })
      })
  }
  
  resetComments () {
    this.setState({
      comments: [],
      authors: {},
      authorRoles: {},
    })
  }
  
  async postComment (text) {
    const { t } = this.props
    const subject = this.props?.subject
    const project = subject?.project
    const authClient = this.props?.authClient
    if (!subject || !project || !authClient) {
      return
    }
    
    const section = `project-${project.id}`
    const discussionTitle = `Subject ${subject.id}`
    
    this.setState({
      postCommentStatus: asyncStates.loading,
      postCommentStatusMessage: '',
    })
    
    try {
      if (!text || text.trim().length === 0) {
        throw new Error(t('QuickTalk.errors.noText'))
      }

      /*
      Quick Fix: check user before posting
      - this is because we can never be 100% sure when a user has logged out on lib-classifier
      - long-term, we want to pass down the User resource from app-project
      - see https://github.com/zooniverse/front-end-monorepo/discussions/2362
       */

      const authorization = await getBearerToken(authClient)  // Check bearer token to ensure session hasn't timed out
      const user = await authClient.checkCurrent()
      if (!authorization || !user) throw('User not logged in')

      // First, get default board
      const boards = await talkClient.type('boards').get({ section, subject_default: true })
      const defaultBoard = boards && boards[0]
      if (!defaultBoard) throw('A board for subject comments has not been setup for this project yet.')
      
      // Next, attempt to find if the Subject already has a discussion attached to it.
      const discussions = await talkClient.type('discussions').get({
        board_id: defaultBoard.id,
        title: discussionTitle,
        subject_default: true,
      })
      const existingDiscussion = discussions && discussions[0]
      
      if (existingDiscussion) { // Add to the existing discussion

        const comment = {
          user_id: user.id,
          body: text,
          discussion_id: +existingDiscussion.id,
        }

        await talkClient.type('comments').create(comment).save()
        this.setState({
          postCommentStatus: asyncStates.success,
          postCommentStatusMessage: '',
        })
        this.fetchComments()

      } else {  // Create a new discussion

        const comments = [{
          user_id: user.id,
          body: text,
          focus_id: +subject.id,
          focus_type: 'Subject',
        }]

        const discussion = {
          title: discussionTitle,
          user_id: user.id,
          subject_default: true,
          board_id: defaultBoard.id,
          comments: comments,
        }

        await talkClient.type('discussions').create(discussion).save()
        this.setState({
          postCommentStatus: asyncStates.success,
          postCommentStatusMessage: '',
        })
        this.fetchComments()
      }

    } catch (err) {
      console.error(err)
      this.setState({
        postCommentStatus: asyncStates.error,
        postCommentStatusMessage: err?.message || err,
      })
    }
  }
    
  render () {
    const {
      subject,
      enabled,
    } = this.props
    
    const {
      comments,
      authors,
      authorRoles,
      postCommentStatus,
      postCommentStatusMessage,
      userId,
    } = this.state

    if (!subject || !enabled) {
      return null
    }
    
    return (
      <QuickTalk
        subject={subject}
        comments={comments}
        authors={authors}
        authorRoles={authorRoles}
        postCommentStatus={postCommentStatus}
        postCommentStatusMessage={postCommentStatusMessage}
        postComment={this.postComment.bind(this)}
        userId={userId}
      />
    )
  }
}

QuickTalkContainer.propTypes = {
  authClient: PropTypes.object, // Quick Fix
  enabled: PropTypes.bool,
  subject: PropTypes.object,
}

QuickTalkContainer.defaultProps = {
  authClient: undefined,
  enabled: false,
  subject: undefined,
}

// Noting that mobx decorators are outdated and should be refactored
@inject(storeMapper)
@observer
class DecoratedQuickTalkContainer extends QuickTalkContainer { }

export default withTranslation('components')(DecoratedQuickTalkContainer)
export { QuickTalkContainer }
