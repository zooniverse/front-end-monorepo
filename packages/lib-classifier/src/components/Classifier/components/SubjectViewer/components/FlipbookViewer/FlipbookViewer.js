import React, { useEffect, useRef, useState } from 'react'
import { Box } from 'grommet'
import asyncStates from '@zooniverse/async-states'
import PropTypes from 'prop-types'
import { withStores } from '@helpers'

import locationValidator from '../../helpers/locationValidator'
import useSubjectImage, { placeholder } from '../SingleImageViewer/hooks/useSubjectImage'

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

function FlipbookViewerContainer({
  defaultFrame = 0,
  ImageObject = window.Image,
  loadingState = asyncStates.initialized,
  onError = () => true,
  onReady = () => true,
  subject
}) {
  const subjectImage = useRef()
  const [currentFrame, setCurrentFrame] = useState(defaultFrame)
  const [viewerSrc, setSrc] = useState('')

  /** This initializes an image element from the subject's defaultFrame src url.
   * We do this so the SVGPanZoom has naturalHeight and naturalWidth of the subject.
   * We're assuming all frames in one subject have the same dimensions. */
  const defaultFrameUrl = subject ? Object.values(subject.locations[defaultFrame])[0] : null
  const { img, error } = useSubjectImage(ImageObject, defaultFrameUrl)
  const { naturalHeight, naturalWidth, src: defaultFrameSrc } = img

  if (error) {
    console.error(error)
    onError(error)
  }

  useEffect(() => {
    setSrc(Object.values(subject.locations[currentFrame])[0])
  }, [currentFrame])

  useEffect(() => {
    const svgImage = subjectImage?.current
    if (svgImage && defaultFrameSrc !== placeholder.src) {
      const { width: clientWidth, height: clientHeight } = svgImage.getBoundingClientRect()
      const target = { clientHeight, clientWidth, naturalHeight, naturalWidth }
      onReady({ target })
    }
  }, [defaultFrameSrc])

  if (loadingState === asyncStates.error || !subject?.locations) {
    return <div>Something went wrong.</div>
  }

  return (
    <Box fill='horizontal'>
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

FlipbookViewerContainer.propTypes = {
  defaultFrame: PropTypes.number,
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }).isRequired
}

export default withStores(FlipbookViewerContainer, storeMapper)
export { FlipbookViewerContainer }
