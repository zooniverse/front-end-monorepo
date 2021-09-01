import React from 'react'
import { withResponsiveContext } from '@zooniverse/react-components'
import { Anchor, Box, Button } from 'grommet'
import { Chat, Close } from 'grommet-icons'
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
`

const FixedButton = styled(Button)`
  position: fixed;
  bottom: 1em;
  right: 1em;
`

const UnorderedList = styled(Box)`
  padding: 0;
`

function QuickTalk ({
  subject,
  comments = [],
  authors = {},
  authorRoles = {},
  postCommentStatus = asyncStates.initialized,
  postCommentStatusMessage = '',
  postComment = () => {},
  userId,
  screenSize,
  expand = false,
}) {
  // TODO: figure out if/how the QuickTalk component should/could be displayed on mobile
  // if (screenSize === 'small') return null
  
  if (!subject) return null
  
  const [_expand, setExpand] = React.useState(expand)
  const a11yTitle = `Subject has ${comments.length} comment(s). Click to expand.`
  const badge = (comments.length > 0) ? comments.length : undefined
  
  if (!_expand) {
    return (
      <FixedButton
        a11yTitle={a11yTitle}
        onClick={() => setExpand(true)}
        data-testid='quicktalk-button'
        icon={<Chat />}
        badge={badge}
      />
    )
  }
  
  return (
    <FixedBox
      elevation='medium'
      pad='small'
      background={{ dark: 'dark-3', light: 'light-3' }}
      data-testid='quicktalk-panel'
      overflow='auto'
    >
      <Box
        flex={false}
      >
        <Box
          direction='row'
          flex={false}
          justify='between'
        >
          <Anchor
            a11yTitle='Go to Subject Discussion on Talk.'
            label='Subject Discussion'
            href={subject.talkURL}
            target='_blank'
            icon={<Chat />}
          />
          <Button
            a11yTitle='Close comments panel.'
            icon={<Close size='small' />}
            onClick={() => setExpand(false)}
            plain={true}
          />
        </Box>
        <UnorderedList as='ul' flex={false}>
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
        </UnorderedList>
        {userId && (
          <PostForm
            postComment={postComment}
            postCommentStatus={postCommentStatus}
            postCommentStatusMessage={postCommentStatusMessage}
          />
        )}
      </Box>
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
  userId: PropTypes.string,
  expand: PropTypes.bool,
}

export default withResponsiveContext(QuickTalk)
export { QuickTalk }
