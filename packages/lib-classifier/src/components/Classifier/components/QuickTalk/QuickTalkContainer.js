import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import asyncStates from '@zooniverse/async-states'

import QuickTalk from './QuickTalk'
import apiClient from 'panoptes-client/lib/api-client'
import talkClient from 'panoptes-client/lib/talk-client'

function storeMapper (stores) {
  const {
    active: subject
  } = stores.classifierStore.subjects
  
  const authClient = stores.classifierStore.authClient
  console.log('+++ authClient: ', authClient)
  
  return {
    authClient,
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
    }
  }
  
  componentDidMount () {
    this.fetchComments()
  }
  
  componentDidUpdate (prevProps) {
    const props = this.props
    if (props.subject?.id !== prevProps.subject?.id) {
      this.fetchComments()
    }
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
    const subject = this.props?.subject
    const project = subject?.project
    const authClient = this.props?.authClient
    if (!subject || !project || !authClient) {
      return
    }
    
    const section = 'project-' + project.id
    const discussionTitle = 'Subject ' + subject.id
    
    this.setState({
      postCommentStatus: asyncStates.loading,
      postCommentStatusMessage: '',
    })
    
    try {
      // Quick Fix: check user before posting
      // - this is because we can never be 100% sure when a user has logged out on lib-classifier
      // - long-term, we want to pass down the User resource from app-project
      // see https://github.com/zooniverse/front-end-monorepo/discussions/2362
      //
      const user = await authClient.checkCurrent()
      console.log('+++ user: ', user)
      if (!user) throw('User not logged in')

      // First, get default board
      talkClient.type('boards').get({ section, subject_default: true })
        .then(boards => boards[0])
        .then(defaultBoard => {
          if (!defaultBoard) throw('A board for subject comments has not been setup for this project yet.')

          // Next, attempt to find if the Subject already has a discussion attached to it.
          talkClient.type('discussions').get({
            board_id: defaultBoard.id,
            title: discussionTitle,
            subject_default: true,
          }).then(discussions => discussions[0])
            .then(discussion => {
              if (discussion) { // Add to the discussion

                const comment = {
                  user_id: user.id,
                  body: text,
                  discussion_id: +discussion.id,
                }

                console.log('+++ TEMP A')
                
                /*
                talkClient.type('comments').create(comment).save()
                  .then (comment => {
                    this.setState({
                      postCommentStatus: asyncStates.success,
                      postCommentStatusMessage: '',
                    })
                    this.fetchComments()
                  })
                */

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

                console.log('+++ TEMP B')

                /*
                talkClient.type('discussions').create(discussion).save()
                  .then (discussion => {
                    this.setState({
                      postCommentStatus: asyncStates.success,
                      postCommentStatusMessage: '',
                    })
                    this.fetchComments()
                  })
                */
              }
            })
        })
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
    } = this.props
    
    const {
      comments,
      authors,
      authorRoles,
      postCommentStatus,
      postCommentStatusMessage,
    } = this.state

    if (!subject) {
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
      />
    )
  }
}

QuickTalkContainer.propTypes = {
  authClient: PropTypes.object, // TEMPORARY  // HACK
  subject: PropTypes.object,
}

QuickTalkContainer.defaultProps = {
  subject: undefined,
}

@inject(storeMapper)
@observer
class DecoratedQuickTalkContainer extends QuickTalkContainer { }

export default DecoratedQuickTalkContainer
export { QuickTalkContainer }
