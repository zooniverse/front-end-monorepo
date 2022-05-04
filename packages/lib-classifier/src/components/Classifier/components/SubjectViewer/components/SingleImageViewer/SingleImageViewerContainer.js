import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { draggable } from '@plugins/drawingTools/components'

import useSubjectImage, { placeholder } from './hooks/useSubjectImage'
import locationValidator from '../../helpers/locationValidator'
import SingleImageViewer from './SingleImageViewer'
import SVGPanZoom from '../SVGComponents/SVGPanZoom'
import withKeyZoom from '../../../withKeyZoom'

const DraggableImage = styled(draggable('image'))`
  cursor: move;
`

function SingleImageViewerContainer({
  enableInteractionLayer = true,
  enableRotation = () => null,
  frame = 0,
  ImageObject = window.Image,
  loadingState = asyncStates.initialized,
  move = false,
  onError = () => true,
  onKeyDown = () => true,
  onReady = () => true,
  rotation = 0,
  setOnPan = () => true,
  setOnZoom = () => true,
  subject,
  title = {},
  zoomControlFn,
  zooming = true
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
    return <div>Something went wrong.</div>
  }

  const enableDrawing =
    loadingState === asyncStates.success && enableInteractionLayer
  const SubjectImage = move ? DraggableImage : 'image'
  const subjectImageProps = {
    height: naturalHeight,
    width: naturalWidth,
    xlinkHref: src,
    ...(move && { dragMove: onDrag })
  }

  if (loadingState !== asyncStates.initialized) {
    const subjectID = subject?.id || 'unknown'
    return (
      <SVGPanZoom
        img={subjectImage.current}
        maxZoom={5}
        minZoom={0.1}
        naturalHeight={naturalHeight}
        naturalWidth={naturalWidth}
        setOnDrag={setOnDrag}
        setOnPan={setOnPan}
        setOnZoom={setOnZoom}
        zooming={zooming}
        src={src}
      >
        <SingleImageViewer
          enableInteractionLayer={enableDrawing}
          height={naturalHeight}
          onKeyDown={onKeyDown}
          rotate={rotation}
          title={title}
          width={naturalWidth}
          zoomControlFn={zoomControlFn}
          zooming={zooming}
        >
          <g ref={subjectImage}>
            <SubjectImage
              role='img'
              aria-label={`Subject ${subjectID}`}
              {...subjectImageProps}
            />
          </g>
        </SingleImageViewer>
      </SVGPanZoom>
    )
  }
  return null
}

SingleImageViewerContainer.propTypes = {
  enableInteractionLayer: PropTypes.bool,
  enableRotation: PropTypes.func,
  frame: PropTypes.number,
  loadingState: PropTypes.string,
  move: PropTypes.bool,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  rotation: PropTypes.number,
  setOnPan: PropTypes.func,
  setOnZoom: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }),
  title: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string
  }),
  zoomControlFn: PropTypes.func,
  zooming: PropTypes.bool
}

export default withKeyZoom(SingleImageViewerContainer)
export { DraggableImage, SingleImageViewerContainer }
