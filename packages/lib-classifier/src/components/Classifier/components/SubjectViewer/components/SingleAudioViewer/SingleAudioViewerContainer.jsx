import { arrayOf, func, shape, string } from 'prop-types'
import asyncStates from '@zooniverse/async-states'
import { observer } from 'mobx-react'

import locationValidator from '../../helpers/locationValidator'
import SingleAudioViewer from './SingleAudioViewer'

const DEFAULT_HANDLER = () => {}

function SingleAudioViewerContainer({
  loadingState = asyncStates.initialized,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject
}) {
  return (
    <SingleAudioViewer
      onError={onError}
      onReady={onReady}
      subject={subject}
    />
  )
}

SingleAudioViewerContainer.propTypes = {
  loadingState: string,
  onError: func,
  onReady: func,
  subject: shape({
    locations: arrayOf(locationValidator)
  })
}

export default observer(SingleAudioViewerContainer)
