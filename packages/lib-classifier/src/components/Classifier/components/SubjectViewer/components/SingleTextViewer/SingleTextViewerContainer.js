import PropTypes from 'prop-types'
import React from 'react'
import asyncStates from '@zooniverse/async-states'

import SingleTextViewer from './SingleTextViewer'

export default function SingleTextViewerContainer ({
  content = '',
  contentLoadingState = asyncStates.initialized,
  error = null,
  onError = () => true,
  onReady = () => true
}) {
  if (contentLoadingState === asyncStates.success) {
    onReady()

    return (
      <SingleTextViewer
        content={content}
      />
    )
  }

  if (error) {
    onError(error)
  }

  return null
}

SingleTextViewerContainer.propTypes = {
  content: PropTypes.string,
  contentLoadingState: PropTypes.oneOf(asyncStates.values),
  onError: PropTypes.func,
  onReady: PropTypes.func
}
