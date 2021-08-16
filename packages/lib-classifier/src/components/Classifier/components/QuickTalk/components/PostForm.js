/*
TODO:
- [ ] form should only appear if user is logged in
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, TextArea } from 'grommet'
import { Markdownz, MarkdownEditor } from '@zooniverse/react-components'
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
    <Box>
      <form onSubmit={onSubmit}>
        <TextArea
          value={text}
          onChange={e => setText(e.target.value)}
          disabled={disabled}
        />
        <Button
          onClick={onSubmit}
          type='submit'
        >
          Submit
        </Button>
      </form>
    </Box>
  )
}

PostForm.propTypes = {
  postComment: PropTypes.func,
}

export default PostForm
