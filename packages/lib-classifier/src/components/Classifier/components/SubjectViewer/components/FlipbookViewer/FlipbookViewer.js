import React, { useEffect, useRef, useState } from 'react'
import { Box } from 'grommet'
import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import { withStores } from '@helpers'

import locationValidator from '../../helpers/locationValidator'
import useSubjectImage, {
  placeholder
} from '../SingleImageViewer/hooks/useSubjectImage'

import SingleImageViewer from '../SingleImageViewer/SingleImageViewer'
import SVGImage from '../SVGComponents/SVGImage'
import SVGPanZoom from '../SVGComponents/SVGPanZoom'
import FlipbookControls from './components'

function storeMapper(store) {
  const { frame: defaultFrame } = store.subjectViewer

  return {
    defaultFrame
  }
}

function FlipbookViewer({
  defaultFrame = 0,
  loadingState = asyncStates.initialized,
  onError = () => true,
  onReady = () => true,
  subject
}) {
  console.log(defaultFrame, loadingState)
  /** This initializes an image element from the subject's defaultFrame src url.
   * We do this so the SVGPanZoom has dimensions of the subject image.
   * We're assuming all frames in one subject have the same dimensions. */
  const defaultFrameUrl = subject ? Object.values(subject.locations[defaultFrame])[0] : null
  const { img, error } = useSubjectImage(window.Image, defaultFrameUrl)
  const { naturalHeight, naturalWidth, src: defaultFrameSrc } = img

  if (error) {
    console.error(error)
    onError(error)
  }

  if (loadingState === asyncStates.error || !subject?.locations) {
    return <div>Something went wrong.</div>
  }

  return (
    <FlipbookImage
      defaultFrame={defaultFrame}
      defaultFrameSrc={defaultFrameSrc}
      naturalHeight={naturalHeight}
      naturalWidth={naturalWidth}
      onError={onError}
      onReady={onReady}
      subject={subject}
    />
  )
}

FlipbookViewer.propTypes = {
  defaultFrame: PropTypes.number,
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }).isRequired
}

export default withStores(FlipbookViewer, storeMapper)
export { FlipbookViewer }

export const FlipbookImage = ({
  defaultFrame,
  defaultFrameSrc,
  onReady,
  naturalHeight,
  naturalWidth,
  subject
}) => {
  const subjectImage = useRef()
  const [currentFrame, setCurrentFrame] = useState(defaultFrame)
  const [viewerSrc, setViewerSrc] = useState('')

  useEffect(() => {
    if (subject?.locations) {
      setViewerSrc(Object.values(subject.locations[currentFrame])[0])
    }
  }, [currentFrame])

  useEffect(() => {
    const svgImage = subjectImage?.current
    if (svgImage && defaultFrameSrc !== placeholder.src) {
      const { width: clientWidth, height: clientHeight } = svgImage.getBoundingClientRect()
      const target = { clientHeight, clientWidth, naturalHeight, naturalWidth }
      onReady({ target })
    }
  }, [defaultFrameSrc])

  return (
    <Box>
      <SVGPanZoom
        img={subjectImage.current}
        maxZoom={5}
        minZoom={0.1}
        naturalHeight={naturalHeight}
        naturalWidth={naturalWidth}
        src={defaultFrameSrc}
      >
        <SingleImageViewer
          enableInteractionLayer={false}
          height={naturalHeight}
          width={naturalWidth}
        >
          <g ref={subjectImage}>
            <SVGImage
              naturalHeight={naturalHeight}
              naturalWidth={naturalWidth}
              src={viewerSrc}
              subjectID={subject.id}
            />
          </g>
        </SingleImageViewer>
      </SVGPanZoom>
      <FlipbookControls
        currentFrame={currentFrame}
        onFrameChange={setCurrentFrame}
        locations={subject.locations}
      />
    </Box>
  )
}
