import asyncStates from '@zooniverse/async-states'
import { Box } from 'grommet'
import PropTypes from 'prop-types'
import { useEffect } from 'react';

import { withStores } from '@helpers'

import locationValidator from '../../helpers/locationValidator'
import SingleImageViewer from '../SingleImageViewer'
import FrameCarousel from './FrameCarousel'

function storeMapper(store) {
  const {
    frame,
    resetView,
    setFrame
  } = store.subjectViewer

  const { activeStepTasks } = store.workflowSteps

  const [activeInteractionTask] = activeStepTasks.filter(
    (task) => task.type === 'drawing' || task.type === 'transcription'
  )
  const {
    activeTool
  } = activeInteractionTask || {}

  return {
    activeTool,
    frame,
    resetView,
    setFrame
  }
}

const DEFAULT_HANDLER = () => true

const DEFAULT_TOOL = {
  validate: () => {}
}

function MultiFrameViewerContainer({
  activeTool = DEFAULT_TOOL,
  enableInteractionLayer = false,
  frame = 0,
  loadingState = asyncStates.initialized,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  resetView = DEFAULT_HANDLER,
  setFrame = DEFAULT_HANDLER,
  subject
}) {
  useEffect(function onFrameChange() {
    activeTool?.validate()
    resetView()
  }, [frame])

  if (loadingState === asyncStates.error) {
    return (
      <div>Something went wrong.</div>
    )
  }

  if (loadingState !== asyncStates.initialized) {
    return (
      <Box
        direction='row'
        fill='horizontal'
      >
        <FrameCarousel
          frame={frame}
          onFrameChange={setFrame}
          locations={subject.locations}
        />
        <SingleImageViewer
          enableInteractionLayer={enableInteractionLayer}
          onError={onError}
          onReady={onReady}
        />
      </Box>
    )
  }
  return null
}

MultiFrameViewerContainer.propTypes = {
  activeTool: PropTypes.shape({
    validate: PropTypes.func
  }),
  enableInteractionLayer: PropTypes.bool,
  frame: PropTypes.number,
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  resetView: PropTypes.func,
  setFrame: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }).isRequired
}

export default withStores(MultiFrameViewerContainer, storeMapper)
export { MultiFrameViewerContainer }
