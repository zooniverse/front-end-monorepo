import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, TextArea } from 'grommet'
import { Markdownz, MarkdownEditor, PrimaryButton } from '@zooniverse/react-components'
import asyncStates from '@zooniverse/async-states'

function stopEvent (e) {
  if (!e) return false
  e.preventDefault && e.preventDefault()
  e.stopPropagation && e.stopPropagation()
  e.returnValue = false
  e.cancelBubble = true
  return false
}

function PostForm ({
  postComment,
  postCommentStatus,
  postCommentStatusMessage,
}) {
  const [text, setText] = React.useState('')
  
  // Reset text when the comment is posting/has been posted.
  React.useEffect(() => {
    setText('')
  }, [postCommentStatus])
  
  function onSubmit (e) {
    postComment(text)
    return stopEvent(e)
  }
  
  const disabled = postCommentStatus === asyncStates.loading
  
  return (
    <Box
      background={{ dark: 'dark-1', light: 'light-1' }}
      flex={false}
    >
      <form onSubmit={onSubmit}>
        <TextArea
          a11yTitle='Write comments'
          value={text}
          onChange={e => setText(e.target.value)}
          disabled={disabled}
        />
        <PrimaryButton
          a11yTitle='Post comment'
          onClick={onSubmit}
          type='submit'
          label='Post'
        />
      </form>
    </Box>
  )
}

PostForm.propTypes = {
  postComment: PropTypes.func,
  postCommentStatus: PropTypes.string,
  postCommentStatusMessage: PropTypes.string,
}

export default PostForm
