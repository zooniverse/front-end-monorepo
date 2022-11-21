import React from 'react'
import PropTypes from 'prop-types'
import { Box, Form, Text, TextArea } from 'grommet'
import styled from 'styled-components'
import { PrimaryButton } from '@zooniverse/react-components'
import asyncStates from '@zooniverse/async-states'
import { useTranslation } from '@translations/i18n'

const SubmitButton = styled(PrimaryButton)`
  display: block;
  margin: 0 auto;
`

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
  postCommentStatusMessage
}) {
  const { t } = useTranslation('components')

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

  let statusText
  if (postCommentStatusMessage) {
    statusText = postCommentStatusMessage
  } else if (postCommentStatus === asyncStates.initialized) {
    statusText = t('QuickTalk.status.initialized')
  } else if (postCommentStatus === asyncStates.loading) {
    statusText = t('QuickTalk.status.loading')
  } else if (postCommentStatus === asyncStates.success) {
    statusText = t('QuickTalk.status.success')
  }

  return (
    <Box
      background={{ dark: 'dark-1', light: 'light-1' }}
      flex={false}
      pad='xsmall'
    >
      {statusText && (
        <Text role='status' aria-live="polite">{statusText}</Text>
      )}
      <Form onSubmit={onSubmit}>
        <TextArea
          a11yTitle='Write comments'
          value={text}
          onChange={e => setText(e.target.value)}
          disabled={disabled}
        />
        <SubmitButton
          a11yTitle='Post comment'
          onClick={onSubmit}
          type='submit'
          label='Post'
          disabled={disabled}
        />
      </Form>
    </Box>
  )
}

PostForm.propTypes = {
  postComment: PropTypes.func,
  postCommentStatus: PropTypes.string,
  postCommentStatusMessage: PropTypes.string
}

export default PostForm
