import { arrayOf, func, shape, string } from 'prop-types'
import asyncStates from '@zooniverse/async-states'
import { observer } from 'mobx-react'

import locationValidator from '../../helpers/locationValidator'
import AudioSpectrogramViewer from './AudioSpectrogramViewer'

const DEFAULT_HANDLER = () => {}

function AudioSpectrogramViewerContainer({
  loadingState = asyncStates.initialized,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject
}) {
  return (
    <AudioSpectrogramViewer
      onError={onError}
      onReady={onReady}
      subject={subject}
    />
  )
}

AudioSpectrogramViewerContainer.propTypes = {
  loadingState: string,
  onError: func,
  onReady: func,
  subject: shape({
    locations: arrayOf(locationValidator)
  })
}

export default observer(AudioSpectrogramViewerContainer)
