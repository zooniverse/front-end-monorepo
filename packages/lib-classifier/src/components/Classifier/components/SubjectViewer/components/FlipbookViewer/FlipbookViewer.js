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
  indexOfDefaultFrame,
  defaultFrameSrc,
  onReady,
  naturalHeight,
  naturalWidth,
  subject
}) => {
  const subjectImage = useRef()
  const [currentFrame, setCurrentFrame] = useState(indexOfDefaultFrame)

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
          <g ref={subjectImage} role='tabpanel'>
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
