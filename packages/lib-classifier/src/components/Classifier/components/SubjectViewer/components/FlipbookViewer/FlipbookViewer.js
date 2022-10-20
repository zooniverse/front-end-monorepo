import React, { useEffect, useRef, useState } from 'react'
import { Box } from 'grommet'
import PropTypes from 'prop-types'

import locationValidator from '../../helpers/locationValidator'
import { placeholder } from '../SingleImageViewer/hooks/useSubjectImage'

import SingleImageViewer from '../SingleImageViewer/SingleImageViewer.js'
import SVGImage from '../SVGComponents/SVGImage'
import SVGPanZoom from '../SVGComponents/SVGPanZoom'
import FlipbookControls from './components'

const FlipbookViewer = ({
  defaultFrame = 0,
  defaultFrameSrc = '',
  onReady = () => true,
  naturalHeight = placeholder.height,
  naturalWidth = placeholder.width,
  playIterations = '',
  subject
}) => {
  const subjectImage = useRef()
  const [currentFrame, setCurrentFrame] = useState(defaultFrame)
  const [playing, setPlaying] = useState(false)

  const viewerSrc = subject?.locations ? Object.values(subject.locations[currentFrame])[0] : ''

  useEffect(() => {
    const svgImage = subjectImage?.current
    if (svgImage && defaultFrameSrc !== placeholder.src) {
      const { width: clientWidth, height: clientHeight } =
        svgImage.getBoundingClientRect()
      const target = { clientHeight, clientWidth, naturalHeight, naturalWidth }
      onReady({ target })
    }
  }, [defaultFrameSrc])

  const onPlayPause = () => {
    if (!playing) {
      setPlaying(true)
    } else {
      setPlaying(false)
    }
  }

  const onKeyDown = (event) => {
    if (event.key === ' ') {
      onPlayPause()
    }
  }

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
          onKeyDown={onKeyDown}
          width={naturalWidth}
        >
          <g ref={subjectImage} role='tabpanel' id='flipbook-tab-panel'>
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
  defaultFrame: PropTypes.number,
  defaultFrameSrc: PropTypes.string,
  onReady: PropTypes.func,
  naturalHeight: PropTypes.number,
  naturalWidth: PropTypes.number,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }).isRequired
}

export default FlipbookViewer
