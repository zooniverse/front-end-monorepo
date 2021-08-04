import React from 'react'
import { withResponsiveContext } from '@zooniverse/react-components'
import { Box } from 'grommet'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import zooTheme from '@zooniverse/grommet-theme'

import Comment from './components/Comment'

const StyledBox = styled(Box)`
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
  screenSize,
}) {
  // TODO: figure out if/how the QuickTalk component should/could be displayed on mobile
  // if (screenSize === 'small') return null
  
  if (!subject) return null
  
  return (
    <StyledBox
      pad='small'
      background={{ dark: 'dark-3', light: 'light-3' }}
      width='large'
    >
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
    </StyledBox>
  )
}

QuickTalk.propTypes = {
  subject: PropTypes.object,
  comments: PropTypes.arrayOf(PropTypes.object),
  authors: PropTypes.object,
  authorRoles: PropTypes.object,
}

export default withResponsiveContext(QuickTalk)
export { QuickTalk }
