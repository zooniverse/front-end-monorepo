import React from 'react'
import { withResponsiveContext } from '@zooniverse/react-components'
import { Box } from 'grommet'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledBox = styled(Box)`
  border: 1px solid red;
`

function roleDisplayName (role) {
  if (
    role.section === 'zooniverse'
    && ['admin', 'team'].indexOf(role.name) >= 0
  ) {
    return 'Zooniverse Team'
    
  } else if (
    role.section !== 'zooniverse'
    && ['admin', 'scientist', 'owner'].indexOf(role.name) >= 0
  ) {
    return 'Researcher'
  }
  
  return role.name
}

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
    <StyledBox>
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
            <li key={`quicktalk-comment-${comment.id}`}>
              <h5>
                {author?.display_name} (@{author?.login})
                {roles?.map(role =>
                  <span key={`quicktalk-role-${comment.id}-${role.name}`}>[{roleDisplayName(role)}]</span>
                )}
              </h5>
              <p>
                {comment.body}
              </p>
            </li>
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
