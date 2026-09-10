import { arrayOf, bool, func, shape, string } from 'prop-types'
import asyncStates from '@zooniverse/async-states'
import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import locationValidator from '../../helpers/locationValidator'
import AudioSpectrogramViewer from './AudioSpectrogramViewer'

const DEFAULT_HANDLER = () => {}

function storeMapper(store) {
  const drawingTasks = store.workflowSteps.findTasksByType('drawing')

  const {
    subjectViewer: { invert }
  } = store

  return {
    invert
  }
}

function AudioSpectrogramViewerContainer({
  enableInteractionLayer = false, // rare for project teams to combine drawing tools with this subject type
  loadingState = asyncStates.initialized,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  subject
}) {
  const { invert } = useStores(storeMapper)

  return (
    <AudioSpectrogramViewer
      enableInteractionLayer={enableInteractionLayer}
      invert={invert}
      onError={onError}
      onReady={onReady}
      subject={subject}
    />
  )
}

AudioSpectrogramViewerContainer.propTypes = {
  enableInteractionLayer: bool,
  loadingState: string,
  onError: func,
  onReady: func,
  subject: shape({
    locations: arrayOf(locationValidator)
  })
}

export default observer(AudioSpectrogramViewerContainer)
