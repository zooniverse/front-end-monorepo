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
  
  return {
    subject
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
  
  postComment (text) {
    console.log('+++ POST: ', text)
    
    const subject = this.props?.subject
    const project = subject?.project
    console.log('+++ project.slug: ', project.slug)
    if (!subject || !project) {
      return
    }
    
    const section = `project-${project.id}`
    const findByDiscussionTitle = 'Subject ${subject.id}'
    
    this.setState({
      postCommentStatus: asyncStates.loading,
    })
    
    // Example at https://master.pfe-preview.zooniverse.org/projects/darkeshard/transformers/talk/209/348
    // POST https://talk-staging.zooniverse.org/comments
    // {
    //   "http_cache":true,
    //   "comments":{
    //     "user_id":"1325361",
    //     "discussion_id":348,
    //     "body":"I'm posting this comment to see what is posted to the Talk API."
    // }}
    
    // First, get default board
    talkClient.type('boards').get({ section, subject_default: true })
      .then(boards => boards[0])
      .then(defaultBoard => {
        console.log('+++ defaultBoard', defaultBoard)
        
        
      })
      .catch(err => {
        console.error(err)
        this.setState({
          postCommentStatus: asyncStates.error
        })
      })
    
    // Get project
    /*
    apiClient.type('projects').get(project.id)
      .then ([project]) =>
        section = projectSection(project)

        # check for a default board
        talkClient.type('boards').get({section, subject_default: true}).index(0)
          .then (board) =>
            if board?
              discussionTitle = defaultDiscussionTitle(@props.subject)

              talkClient.type('discussions').get(board_id: board.id, title: discussionTitle, subject_default: true).index(0)
                .then (discussion) =>
                  if discussion?
                    user_id = @props.user?.id
                    body = commentText
                    discussion_id = +discussion.id

                    comment = merge {}, {user_id, discussion_id, body}

                    talkClient.type('comments').create(comment).save()
                      .then (comment) =>
                        @context.router.push "/projects/#{owner}/#{name}/talk/#{discussion.board_id}/#{discussion.id}?comment=#{comment.id}"
          */
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
    } = this.state

    if (!subject) {
      return (<div>NOTHING</div>)
    }
    
    return (
      <QuickTalk
        subject={subject}
        comments={comments}
        authors={authors}
        authorRoles={authorRoles}
        postCommentStatus={postCommentStatus}
        postComment={this.postComment.bind(this)}
      />
    )
  }
}

QuickTalkContainer.propTypes = {
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
