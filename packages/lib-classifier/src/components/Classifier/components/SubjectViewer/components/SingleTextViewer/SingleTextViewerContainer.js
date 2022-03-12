import PropTypes from 'prop-types'
import React from 'react'
import asyncStates from '@zooniverse/async-states'

import SingleTextViewer from './SingleTextViewer'

export default function SingleTextViewerContainer (props) {
  const {
    onError,
    onReady,
    subject
  } = props
  const { content, contentLoadingState } = subject

  if (contentLoadingState === asyncStates.success) {
    onReady()

    return (
      <SingleTextViewer
        content={content}
      />
    )
  }

  if (contentLoadingState === asyncStates.error) {
    onError(subject.error)
  }

  return null
}

SingleTextViewerContainer.defaultProps = {
  onError: () => true,
  onReady: () => true,
  subject: {
    content: '',
    contentLoadingState: asyncStates.initialized
  }
}

SingleTextViewerContainer.propTypes = {
  onError: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    content: PropTypes.string,
    contentLoadingState: PropTypes.oneOf(asyncStates.values)
  })
}
