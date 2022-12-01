import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react';

import withKeyZoom from '../../../withKeyZoom'
import locationValidator from '../../helpers/locationValidator'
import useSubjectImage, { PLACEHOLDER_URL } from './hooks/useSubjectImage'
import SVGImage from '../SVGComponents/SVGImage'
import SVGPanZoom from '../SVGComponents/SVGPanZoom'
import SingleImageViewer from './SingleImageViewer'

function SingleImageViewerContainer ({
  enableInteractionLayer = true,
  enableRotation = () => null,
  frame = 0,
  invert = false,
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
  const { img, error, loading } = useSubjectImage(imageUrl)
  // default to a placeholder while image is loading.
  const { naturalHeight, naturalWidth, src } = img

  useEffect(function onImageLoad() {
    if (src !== PLACEHOLDER_URL ) {
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

  useEffect(function logError() {
    if (!loading && error) {
      console.error(error)
      onError(error)
    }
  }, [error, loading])

  function setOnDrag (callback) {
    setDragMove(() => callback)
  }

  function onDrag (event, difference) {
    dragMove?.(event, difference)
  }

  if (loadingState === asyncStates.error) {
    return <div>Something went wrong.</div>
  }

  const enableDrawing =
    loadingState === asyncStates.success && enableInteractionLayer

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
          invert={invert}
          onKeyDown={onKeyDown}
          rotate={rotation}
          title={title}
          width={naturalWidth}
          zoomControlFn={zoomControlFn}
          zooming={zooming}
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
    )
  }
  return null
}

SingleImageViewerContainer.propTypes = {
  enableInteractionLayer: PropTypes.bool,
  enableRotation: PropTypes.func,
  frame: PropTypes.number,
  invert: PropTypes.bool,
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
export { SingleImageViewerContainer }
