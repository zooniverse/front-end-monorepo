import asyncStates from '@zooniverse/async-states'
import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'

import withKeyZoom from '@components/Classifier/components/withKeyZoom'
import { withStores } from '@helpers'

import locationValidator from '../../helpers/locationValidator'
import useSubjectImage, { placeholder } from '../SingleImageViewer/hooks/useSubjectImage'
import SingleImageViewer from '../SingleImageViewer/SingleImageViewer'
import SVGImage from '../SVGComponents/SVGImage'
import SVGPanZoom from '../SVGComponents/SVGPanZoom'
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

  return {
    activeTool,
    enableRotation,
    frame,
    invert,
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
  enableInteractionLayer = true,
  enableRotation = () => null,
  frame = 0,
  ImageObject = window.Image,
  invert = false,
  loadingState = asyncStates.initialized,
  move,
  onError = () => true,
  onKeyDown = () => true,
  onReady = () => true,
  rotation,
  setFrame = () => true,
  setOnPan = () => true,
  setOnZoom = () => true,
  subject
}) {
  const subjectImage = useRef()
  const [dragMove, setDragMove] = useState()
  // TODO: replace this with a better function to parse the image location from a subject.
  const imageUrl = subject ? Object.values(subject.locations[frame])[0] : null
  const { img, error } = useSubjectImage(ImageObject, imageUrl)
  // default to a placeholder while image is loading.
  const { naturalHeight, naturalWidth, src } = img

  useEffect(function onImageLoad() {
    if (src !== placeholder.src) {
      const svgImage = subjectImage.current
      const { width: clientWidth, height: clientHeight } = svgImage
        ? svgImage.getBoundingClientRect()
        : {}
      const target = { clientHeight, clientWidth, naturalHeight, naturalWidth }
      onReady({ target })
    }
  }, [src])

  useEffect(function onMount() {
    enableRotation()
  }, [])

  useEffect(function onFrameChange() {
    activeTool?.validate()
  }, [frame])

  if (error) {
    console.error(error)
    onError(error)
  }

  function setOnDrag(callback) {
    setDragMove(() => callback)
  }

  function onDrag(event, difference) {
    dragMove?.(event, difference)
  }

  if (loadingState === asyncStates.error) {
    return (
      <div>Something went wrong.</div>
    )
  }

  const enableDrawing =
    loadingState === asyncStates.success && enableInteractionLayer

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
        <SVGPanZoom
          img={subjectImage.current}
          maxZoom={5}
          minZoom={0.1}
          naturalHeight={naturalHeight}
          naturalWidth={naturalWidth}
          setOnDrag={setOnDrag}
          setOnPan={setOnPan}
          setOnZoom={setOnZoom}
          src={src}
        >
          <SingleImageViewer
            enableInteractionLayer={enableDrawing}
            height={naturalHeight}
            onKeyDown={onKeyDown}
            rotate={rotation}
            width={naturalWidth}
          >
            <g ref={subjectImage}>
              <SVGImage
                invert={invert}
                move={move}
                naturalHeight={naturalHeight}
                naturalWidth={naturalWidth}
                onDrag={onDrag}
                src={src}
                subjectID={subjectID}
              />
            </g>
          </SingleImageViewer>
        </SVGPanZoom>
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

export default withStores(withKeyZoom(MultiFrameViewerContainer), storeMapper)
export { MultiFrameViewerContainer }
