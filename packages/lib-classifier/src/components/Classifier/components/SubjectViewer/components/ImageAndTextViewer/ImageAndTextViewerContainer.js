import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import asyncStates from '@zooniverse/async-states'

import withKeyZoom from '@components/Classifier/components/withKeyZoom'
import { withStores } from '@helpers'
import { draggable } from '@plugins/drawingTools/components'

import useSubjectImage, { placeholder } from '../SingleImageViewer/hooks/useSubjectImage'
import locationValidator from '../../helpers/locationValidator'
import SingleImageViewer from '../SingleImageViewer/SingleImageViewer'
import SVGPanZoom from '../SVGComponents/SVGPanZoom'
import SingleTextViewer from '../SingleTextViewer'
import StepNavigation from '@components/Classifier/components/SlideTutorial/components/StepNavigation'

function storeMapper (store) {
  const {
    enableRotation,
    frame,
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
    move,
    rotation,
    setFrame,
    setOnPan,
    setOnZoom
  }
}

const DraggableImage = styled(draggable('image'))`
  cursor: move;
`

const defaultTool = {
  validate: () => {}
}

function ImageAndTextViewerContainer ({
  activeTool = defaultTool,
  enableInteractionLayer = true,
  enableRotation = () => null,
  frame = 0,
  ImageObject = window.Image,
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

  // TODO: refactor with frame
  const [location, setLocation] = useState(0)

  // TODO: replace this with a better function to parse the image location from a subject.
  const imageUrl = subject ? Object.values(subject.locations[frame])[0] : null
  const { img, error } = useSubjectImage(ImageObject, imageUrl)
  // default to a placeholder while image is loading.
  const { naturalHeight, naturalWidth, src } = img

  useEffect(function onImageLoad () {
    if (src !== placeholder.src) {
      const svgImage = subjectImage.current
      const { width: clientWidth, height: clientHeight } = svgImage
        ? svgImage.getBoundingClientRect()
        : {}
      const target = { clientHeight, clientWidth, naturalHeight, naturalWidth }
      onReady({ target })
    }
  }, [src])

  useEffect(function onMount () {
    enableRotation()
  }, [])

  useEffect(function onFrameChange () {
    activeTool?.validate()
  }, [frame])

  if (error) {
    console.error(error)
    onError(error)
  }

  function setOnDrag (callback) {
    setDragMove(() => callback)
  }

  function onDrag (event, difference) {
    dragMove?.(event, difference)
  }

  function onLocationChange () {
    setLocation(Math.abs(location - 1))
  }

  if (loadingState === asyncStates.error) {
    return (
      <div>Something went wrong.</div>
    )
  }

  const enableDrawing = (loadingState === asyncStates.success) && enableInteractionLayer
  const SubjectImage = move ? DraggableImage : 'image'
  const subjectImageProps = {
    height: naturalHeight,
    width: naturalWidth,
    xlinkHref: src,
    ...(move && { dragMove: onDrag })
  }

  if (loadingState !== asyncStates.initialized) {
    return (
      <Box
        fill='horizontal'
      >
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
          {location === 0 ? (
            <SingleImageViewer
              enableInteractionLayer={enableDrawing}
              height={naturalHeight}
              onKeyDown={onKeyDown}
              rotate={rotation}
              width={naturalWidth}
            >
              <g ref={subjectImage}>
                <SubjectImage
                  {...subjectImageProps}
                />
              </g>
            </SingleImageViewer>
          ) : (
            <SingleTextViewer />
          )}
        </SVGPanZoom>
        <StepNavigation
          onChange={onLocationChange}
          stepIndex={location}
          steps={[0, 1]}
        />
      </Box>
    )
  }
  return null
}

ImageAndTextViewerContainer.propTypes = {
  activeTool: PropTypes.shape({
    validate: PropTypes.func
  }),
  enableInteractionLayer: PropTypes.bool,
  enableRotation: PropTypes.func,
  frame: PropTypes.number,
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

export default withStores(withKeyZoom(ImageAndTextViewerContainer), storeMapper)
export { DraggableImage, ImageAndTextViewerContainer }
