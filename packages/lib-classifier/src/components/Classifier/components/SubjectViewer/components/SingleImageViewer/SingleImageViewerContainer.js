import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import { useKeyZoom, useSubjectImage } from '@hooks'

import locationValidator from '../../helpers/locationValidator'
import SVGImage from '../SVGComponents/SVGImage'
import SVGPanZoom from '../SVGComponents/SVGPanZoom'
import SingleImageViewer from './SingleImageViewer'

const DEFAULT_HANDLER = () => true

function SingleImageViewerContainer({
  enableInteractionLayer = true,
  enableRotation = DEFAULT_HANDLER,
  frame = 0,
  invert = false,
  limitSubjectHeight = false,
  loadingState = asyncStates.initialized,
  move = false,
  onError = DEFAULT_HANDLER,
  onReady = DEFAULT_HANDLER,
  rotation = 0,
  setOnPan = DEFAULT_HANDLER,
  setOnZoom = DEFAULT_HANDLER,
  subject,
  title = {},
  zoomControlFn,
  zooming = true
}) {
  const { onKeyZoom } = useKeyZoom(rotation)
  const [dragMove, setDragMove] = useState()
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

  if (loadingState !== asyncStates.initialized) {
    const subjectID = subject?.id || 'unknown'

    return (
      <SVGPanZoom
        key={`${naturalWidth}-${naturalHeight}`}
        limitSubjectHeight={limitSubjectHeight}
        maxZoom={5}
        minZoom={0.1}
        naturalHeight={naturalHeight}
        naturalWidth={naturalWidth}
        setOnDrag={setOnDrag}
        setOnPan={setOnPan}
        setOnZoom={setOnZoom}
        zooming={zooming}
        src={img.src}
      >
        <SingleImageViewer
          enableInteractionLayer={enableDrawing}
          height={naturalHeight}
          invert={invert}
          limitSubjectHeight={limitSubjectHeight}
          onKeyDown={onKeyZoom}
          rotate={rotation}
          title={title}
          width={naturalWidth}
          zoomControlFn={zoomControlFn}
          zooming={zooming}
          subject={subject}
        >
          <SVGImage
            ref={subjectImage}
            invert={invert}
            move={move}
            naturalHeight={naturalHeight}
            naturalWidth={naturalWidth}
            onDrag={onDrag}
            src={img.src}
            subjectID={subjectID}
          />
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
  limitSubjectHeight: PropTypes.bool,
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

export default SingleImageViewerContainer
