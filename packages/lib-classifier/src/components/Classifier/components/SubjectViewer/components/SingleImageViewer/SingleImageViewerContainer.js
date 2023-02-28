import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';

import { useSubjectImage } from '@hooks'

import withKeyZoom from '../../../withKeyZoom'
import locationValidator from '../../helpers/locationValidator'
import SVGImage from '../SVGComponents/SVGImage'
import SVGPanZoom from '../SVGComponents/SVGPanZoom'
import SingleImageViewer from './SingleImageViewer'

const DEFAULT_HANDLER = () => true

function SingleImageViewerContainer ({
  enableInteractionLayer = true,
  enableRotation = DEFAULT_HANDLER,
  frame = 0,
  invert = false,
  loadingState = asyncStates.initialized,
  move = false,
  onError = DEFAULT_HANDLER,
  onKeyDown = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  rotation = 0,
  setOnPan = DEFAULT_HANDLER,
  setOnZoom = DEFAULT_HANDLER,
  subject,
  title = {},
  zoomControlFn,
  zooming = true
}) {
  const [dragMove, setDragMove] = useState()
  // TODO: replace this with a better function to parse the image location from a subject.
  const imageUrl = subject ? Object.values(subject.locations[frame])[0] : null
  const { img, error, loading, subjectImage } = useSubjectImage({
    src: imageUrl,
    onReady,
    onError
  })

  useEffect(function onMount () {
    enableRotation()
  }, [])

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
        naturalHeight={img.naturalHeight}
        naturalWidth={img.naturalWidth}
        setOnDrag={setOnDrag}
        setOnPan={setOnPan}
        setOnZoom={setOnZoom}
        zooming={zooming}
        src={img.src}
      >
        <SingleImageViewer
          enableInteractionLayer={enableDrawing}
          height={img.naturalHeight}
          invert={invert}
          onKeyDown={onKeyDown}
          rotate={rotation}
          title={title}
          width={img.naturalWidth}
          zoomControlFn={zoomControlFn}
          zooming={zooming}
        >
          <g ref={subjectImage}>
            <SVGImage
              invert={invert}
              move={move}
              naturalHeight={img.naturalHeight}
              naturalWidth={img.naturalWidth}
              onDrag={onDrag}
              src={img.src}
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
