import PropTypes from 'prop-types'
import React from 'react'
import asyncStates from '@zooniverse/async-states'

import SingleTextViewer from './SingleTextViewer'

const defaultSubject = {
  content: '',
  contentLoadingState: asyncStates.initialized
}

export default function SingleTextViewerContainer ({
  onError = () => true,
  onReady = () => true,
  subject = defaultSubject
}) {
  const { content, contentLoadingState } = subject

  if (contentLoadingState === asyncStates.success) {
    onReady()

    return (
      <SingleTextViewer
        content={content}
      />
    )
  }

  if (subject?.error) {
    onError(subject.error)
  }

  return null
}

SingleTextViewerContainer.propTypes = {
  onError: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    content: PropTypes.string,
    contentLoadingState: PropTypes.oneOf(asyncStates.values)
  })
}
