import React from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'

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
        
  /*
  https://talk-staging.zooniverse.org/comments?http_cache=true&admin=true&section=project-1651&focus_id=75268&focus_type=Subject&page=1&sort=-created_at
  
  getComments: (page = @props.location.query.page) ->
    query =
      section: @props.section
      focus_id: @props.subject.id
      focus_type: 'Subject'
      page: page or 1
      sort: '-created_at'

    talkClient.type('comments').get(query).then (comments) =>
        author_ids = []
        authors = {}
        author_roles = {}
        meta = comments[0]?.getMeta() or { }
        @setState {comments, meta}
        comments.map (comment) ->
          author_ids.push comment.user_id
        author_ids = author_ids.filter (id, i) -> author_ids.indexOf(id) is i

        apiClient
          .type 'users'
          .get
            id: author_ids
          .then (users) =>
            users.map (user) -> authors[user.id] = user
            @setState {authors}

        talkClient
          .type 'roles'
          .get
            user_id: author_ids
            section: ['zooniverse', @props.section]
            is_shown: true
            page_size: 100
          .then (roles) =>
            roles.map (role) ->
              author_roles[role.user_id] ?= []
              author_roles[role.user_id].push role
            @setState {author_roles}
  
   */
  
  fetchComments () {
    this.resetComments()
    
    const subject = this.props?.subject
    const project = subject?.project
    if (!subject || !project) {
      return
    }
    
    const query = {
      section: `project-${project.id}`,
      focus_id: subject.id,
      focus_type: 'Subject',
      page: 1,
      sort: '-created_at',
    }
        
    console.log('+++ fetchComments', query)
      
    talkClient.type('comments').get(query)
      .then (comments =>{
        console.log('+++ comments: ', comments)
        
        this.setState({ comments })
        
        let author_ids = []
        let authors = {}
        let author_roles = {}

        author_ids = comments.map(comment => comment.user_id)
        author_ids = author_ids.filter((id, i) => author_ids.indexOf(id) === i)
        
        apiClient.type('users').get({ id: author_ids })
          .then(users => {
            users.forEach(user => authors[user.id] = user)
            console.log('+++ authors: ', authors)
            this.setState({ authors })
          })

        /*
        talkClient
          .type 'roles'
          .get
            user_id: author_ids
            section: ['zooniverse', @props.section]
            is_shown: true
            page_size: 100
          .then (roles) =>
            roles.map (role) ->
              author_roles[role.user_id] ?= []
              author_roles[role.user_id].push role
            @setState {author_roles}
        */
        
      })
  }
        
  resetComments () {
    console.log('+++ resetComments')
    
    this.setState({
      comments: [],
      authors: {},
    })
  }
    
  render () {
    const {
      subject,
    } = this.props

    if (!subject) {
      return (<div>NOTHING</div>)
    }
    
    return (
      <QuickTalk
        subject={subject}
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
