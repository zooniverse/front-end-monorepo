import asyncStates from '@zooniverse/async-states'
import { Box } from 'grommet'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';

import { withStores } from '@helpers'
import { useSubjectImage } from '@hooks'

import locationValidator from '../../helpers/locationValidator'
import SingleImageViewer from '../SingleImageViewer/SingleImageViewer'
import FrameCarousel from './FrameCarousel'

function storeMapper(store) {
  const {
    enableRotation,
    frame,
    invert,
    move,
    rotation,
    setFrame,
    setOnPan,
    setOnZoom
  } = store.subjectViewer

  const { activeStepTasks } = store.workflowSteps

  const [activeInteractionTask] = activeStepTasks.filter(
    (task) => task.type === 'drawing' || task.type === 'transcription'
  )
  const {
    activeTool
  } = activeInteractionTask || {}

  const {
    limit_subject_height: limitSubjectHeight
  } = store.workflows?.active?.configuration

  return {
    activeTool,
    enableRotation,
    frame,
    invert,
    limitSubjectHeight,
    move,
    rotation,
    setFrame,
    setOnPan,
    setOnZoom
  }
}

const defaultTool = {
  validate: () => {}
}

function MultiFrameViewerContainer({
  activeTool = defaultTool,
  enableInteractionLayer = false,
  enableRotation = () => null,
  frame = 0,
  invert = false,
  limitSubjectHeight = false,
  loadingState = asyncStates.initialized,
  move,
  onError = () => true,
  onReady = () => true,
  rotation,
  setFrame = () => true,
  setOnPan = () => true,
  setOnZoom = () => true,
  subject
}) {
  // TODO: replace this with a better function to parse the image location from a subject.
  const imageLocation = subject ? subject.locations[frame] : null
  const { img, error, loading, subjectImage } = useSubjectImage({
    src: imageLocation?.url,
    onReady,
    onError
  })
  const {
    naturalHeight = 600,
    naturalWidth = 800
  } = img

  useEffect(function onMount() {
    enableRotation()
  }, [])

  useEffect(function onFrameChange() {
    activeTool?.validate()
  }, [frame])

  if (loadingState === asyncStates.error) {
    return (
      <div>Something went wrong.</div>
    )
  }

  if (loadingState !== asyncStates.initialized) {
    const subjectID = subject?.id || 'unknown'
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
          enableInteractionLayer={loadingState === asyncStates.success && enableInteractionLayer}
          frame={frame}
          imgRef={subjectImage}
          invert={invert}
          limitSubjectHeight={limitSubjectHeight}
          move={move}
          naturalHeight={naturalHeight}
          naturalWidth={naturalWidth}
          rotation={rotation}
          setOnPan={setOnPan}
          setOnZoom={setOnZoom}
          src={img.src}
          subject={subject}
          subjectId={subjectID}
          title={{ id: subjectID, text: subjectID }}
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
  enableRotation: PropTypes.func,
  frame: PropTypes.number,
  invert: PropTypes.bool,
  limitSubjectHeight: PropTypes.bool,
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  setFrame: PropTypes.func,
  setOnPan: PropTypes.func,
  setOnZoom: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }).isRequired
}

export default withStores(MultiFrameViewerContainer, storeMapper)
export { MultiFrameViewerContainer }
