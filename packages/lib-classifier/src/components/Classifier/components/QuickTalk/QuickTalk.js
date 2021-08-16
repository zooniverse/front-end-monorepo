import React from 'react'
import { withResponsiveContext } from '@zooniverse/react-components'
import { Box, Button } from 'grommet'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import zooTheme from '@zooniverse/grommet-theme'
import asyncStates from '@zooniverse/async-states'

import Comment from './components/Comment'
import PostForm from './components/PostForm'

const FixedBox = styled(Box)`
  position: fixed;
  bottom: 1em;
  right: 1em;
  max-width: 80vw;
  max-height: 80vh;
  overflow: auto;
  border: 1px solid red;
`

const FixedButton = styled(Button)`
  position: fixed;
  bottom: 1em;
  right: 1em;
  border: 1px solid red;
`

function QuickTalk ({
  subject,
  comments = [],
  authors = {},
  authorRoles = {},
  postCommentStatus = asyncStates.initialized,
  postCommentStatusMessage = '',
  postComment = () => {},
  screenSize,
  expand = false,
}) {
  // TODO: figure out if/how the QuickTalk component should/could be displayed on mobile
  // if (screenSize === 'small') return null
  
  if (!subject) return null
  
  const [_expand, setExpand] = React.useState(expand)
  
  if (!_expand) {
    return (
      <FixedButton
        onClick={() => setExpand(true)}
        data-testid='quicktalk-button'
      >
        {comments.length} comment(s)
      </FixedButton>
    )
  }
  
  return (
    <FixedBox
      pad='small'
      background={{ dark: 'dark-3', light: 'light-3' }}
      data-testid='quicktalk-panel'
    >
      <div>
        <div>
          <a href={subject.talkURL}>[TALK LINK]</a>
          &nbsp;
          {comments.length} comment(s)
        </div>
        <ul>
          {comments.map(comment => {
            const author = authors[comment.user_id]
            const roles = authorRoles[comment.user_id]

            return (
              <Comment
                key={`quicktalk-comment-${comment.id}`}
                comment={comment}
                author={author}
                roles={roles}
              />
            )
          })}
        </ul>
        <div>
          Post Comment Status: {postCommentStatus}
        </div>
        <div>
          [{postCommentStatusMessage}]
        </div>
        <PostForm
          postComment={postComment}
          postCommentStatus={postCommentStatus}
        />
        <div>
          <Button onClick={() => setExpand(false)}>Close</Button>
        </div>
      </div>
    </FixedBox>
  )
}

QuickTalk.propTypes = {
  subject: PropTypes.object,
  comments: PropTypes.arrayOf(PropTypes.object),
  authors: PropTypes.object,
  authorRoles: PropTypes.object,
  postCommentStatus: PropTypes.string,
  postCommentStatusMessage: PropTypes.string,
  postComment: PropTypes.func,
  expand: PropTypes.bool,
}

export default withResponsiveContext(QuickTalk)
export { QuickTalk }
