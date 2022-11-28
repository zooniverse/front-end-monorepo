import React, { useEffect, useRef, useState } from 'react'
import { Box } from 'grommet'
import PropTypes from 'prop-types'

import locationValidator from '../../helpers/locationValidator'
import { PLACEHOLDER_URL } from '../SingleImageViewer/hooks/useSubjectImage'

import SingleImageViewer from '../SingleImageViewer/SingleImageViewer.js'
import SVGImage from '../SVGComponents/SVGImage'
import SVGPanZoom from '../SVGComponents/SVGPanZoom'
import FlipbookControls from './components'

const FlipbookViewer = ({
  defaultFrame = 0,
  defaultFrameSrc = '',
  enableRotation = () => true,
  invert = false,
  move,
  naturalHeight = 600,
  naturalWidth = 800,
  onKeyDown = () => true,
  onReady = () => true,
  playIterations,
  rotation,
  setOnPan = () => true,
  setOnZoom = () => true,
  subject
}) => {
  const subjectImage = useRef()
  const [currentFrame, setCurrentFrame] = useState(defaultFrame)
  const [playing, setPlaying] = useState(false)
  const [dragMove, setDragMove] = useState()

  const viewerSrc = subject?.locations ? Object.values(subject.locations[currentFrame])[0] : ''

  useEffect(() => {
    const svgImage = subjectImage?.current
    if (svgImage && defaultFrameSrc !== PLACEHOLDER_URL) {
      const { width: clientWidth, height: clientHeight } =
        svgImage.getBoundingClientRect()
      const target = { clientHeight, clientWidth, naturalHeight, naturalWidth }
      onReady({ target })
      enableRotation()
    }
  }, [defaultFrameSrc])

  const onPlayPause = () => {
    setPlaying(!playing)
  }

  const handleSpaceBar = (event) => {
    if (event.key === ' ') {
      event.preventDefault()
      onPlayPause()
    } else {
      onKeyDown(event)
    }
  }

  const setOnDrag = (callback) => {
    setDragMove(() => callback)
  }

  const onDrag = (event, difference) => {
    dragMove?.(event, difference)
  }

  return (
    <Box>
      <SVGPanZoom
        img={subjectImage.current}
        maxZoom={5}
        minZoom={0.1}
        naturalHeight={naturalHeight}
        naturalWidth={naturalWidth}
        setOnDrag={setOnDrag}
        setOnPan={setOnPan}
        setOnZoom={setOnZoom}
        src={defaultFrameSrc}
      >
        <SingleImageViewer
          enableInteractionLayer={false}
          height={naturalHeight}
          onKeyDown={handleSpaceBar}
          rotate={rotation}
          width={naturalWidth}
        >
          <g ref={subjectImage} role='tabpanel' id='flipbook-tab-panel'>
            <SVGImage
              invert={invert}
              move={move}
              naturalHeight={naturalHeight}
              naturalWidth={naturalWidth}
              onDrag={onDrag}
              src={viewerSrc}
              subjectID={subject.id}
            />
          </g>
        </SingleImageViewer>
      </SVGPanZoom>
      <FlipbookControls
        currentFrame={currentFrame}
        locations={subject.locations}
        onFrameChange={setCurrentFrame}
        onPlayPause={onPlayPause}
        playing={playing}
        playIterations={playIterations}
      />
    </Box>
  )
}

FlipbookViewer.propTypes = {
  /** Fetched from metadata.default_frame or initialized to zero */
  defaultFrame: PropTypes.number,
  /** Either placeholder.src or the subject image src */
  defaultFrameSrc: PropTypes.string,
  /** Function passed from Subject Viewer Store */
  enableRotation: PropTypes.func,
  /** Passed from Subject Viewer Store */
  invert: PropTypes.bool,
  /** Passed from Subject Viewer Store */
  move: PropTypes.bool,
  /** Height of subject image */
  naturalHeight: PropTypes.number,
  /** Width of subject image */
  naturalWidth: PropTypes.number,
  /** withKeyZoom in for using keyboard pan and zoom controls while focused on the subject image */
  onKeyDown: PropTypes.func,
  /** Passed from Subject Viewer Store and called when default frame's src is loaded */
  onReady: PropTypes.func,
  /** Fetched from workflow configuration. Number preference for how many loops to play */
  playIterations: PropTypes.number,
  /** Passed from the Subject Viewer Store */
  setOnPan: PropTypes.func,
  /** Passed from the Subject Viewer Store */
  setOnZoom: PropTypes.func,
  /** Required. Passed from SubjectViewer component */
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }).isRequired
}

export default FlipbookViewer
