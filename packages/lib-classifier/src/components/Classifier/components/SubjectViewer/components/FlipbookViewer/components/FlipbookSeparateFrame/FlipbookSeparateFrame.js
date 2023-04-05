import { useEffect, useState } from 'react'
import { Box, Grid } from 'grommet'
import PropTypes from 'prop-types'

import locationValidator from '../../../../helpers/locationValidator'
import useSubjectImage from '@hooks/useSubjectImage.js'

import SingleImageViewer from '../../../SingleImageViewer/SingleImageViewer.js'
import SVGImage from '../../../SVGComponents/SVGImage'
import SVGPanZoom from '../../../SVGComponents/SVGPanZoom'
import SeparateFrameImageToolbar from './components/SeparateFrameImageToolbar'

const DEFAULT_HANDLER = () => true

const FlipbookSeparateFrame = ({
  enableRotation = () => true,
  frameUrl = '',
  invert = false,
  limitSubjectHeight = false,
  move,
  onError = () => true,
  onKeyDown = () => true,
  onReady = () => true,
  rotation,
  subject
}) => {
  const [dragMove, setDragMove] = useState()
  const { img, error, loading, subjectImage } = useSubjectImage({
    src: frameUrl,
    onReady,
    onError
  })
  const { naturalHeight, naturalWidth, src: frameSrc } = img

  useEffect(() => {
    enableRotation()
  }, [frameSrc])

  const setOnDrag = callback => {
    setDragMove(() => callback)
  }

  const onDrag = (event, difference) => {
    dragMove?.(event, difference)
  }

  const separateFrameZoomIn = () => {
    console.log('Separate Frame Zoom In')
  }

  const separateFrameZoomOut = () => {
    console.log('Separate Frame Zoom Out')
  }

  const separateFrameRotate = () => {
    console.log('Separate Frame Rotate')
  }

  const separateFrameInvert = () => {
    console.log('Separate Frame Invert')
  }

  const separateFrameResetView = () => {
    console.log('Separate Frame Reset View')
  }

  return (
    <Box pad={{ bottom: 'small' }}>
      <Grid
        as='section'
        areas={[['subject', 'toolbar']]}
        columns={['auto', '3rem']}
        gridArea='viewer'
        height='fit-content'
        rows={['auto']}
      >
        <SVGPanZoom
          gridArea='subject'
          img={subjectImage.current}
          limitSubjectHeight={limitSubjectHeight}
          maxZoom={5}
          minZoom={0.1}
          naturalHeight={naturalHeight}
          naturalWidth={naturalWidth}
          setOnDrag={setOnDrag}
          setOnPan={DEFAULT_HANDLER}
          setOnZoom={DEFAULT_HANDLER}
          src={frameSrc}
        >
          <SingleImageViewer
            enableInteractionLayer={false}
            height={naturalHeight}
            limitSubjectHeight={limitSubjectHeight}
            onKeyDown={onKeyDown}
            rotate={rotation}
            width={naturalWidth}
          >
            <g ref={subjectImage}>
              <SVGImage
                invert={invert}
                move={move}
                naturalHeight={naturalHeight}
                naturalWidth={naturalWidth}
                onDrag={onDrag}
                src={frameSrc}
                subjectID={subject.id}
              />
            </g>
          </SingleImageViewer>
        </SVGPanZoom>
        <SeparateFrameImageToolbar
          gridArea='toolbar'
          separateFrameInvert={separateFrameInvert}
          separateFrameResetView={separateFrameResetView}
          separateFrameRotate={separateFrameRotate}
          separateFrameZoomIn={separateFrameZoomIn}
          separateFrameZoomOut={separateFrameZoomOut}
        />
      </Grid>
    </Box>
  )
}

FlipbookSeparateFrame.propTypes = {
  /** Function passed from Subject Viewer Store */
  enableRotation: PropTypes.func,
  /** String of Object.values(subject.locations[this frame index][0]) */
  frameUrl: PropTypes.string,
  /** Passed from SubjectViewer and called if `useSubjectImage()` hook fails. */
  onError: PropTypes.func,
  /** Passed from Subject Viewer Store */
  invert: PropTypes.bool,
  /** Passed from Subject Viewer Store */
  move: PropTypes.bool,
  /** withKeyZoom in for using keyboard pan and zoom controls while focused on the subject image */
  onKeyDown: PropTypes.func,
  /** Passed from Subject Viewer Store and called when default frame's src is loaded */
  onReady: PropTypes.func,
  /** Passed from the Subject Viewer Store */
  setOnPan: PropTypes.func,
  /** Passed from the Subject Viewer Store */
  setOnZoom: PropTypes.func,
  /** Required. Passed from SubjectViewer component */
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }).isRequired
}

export default FlipbookSeparateFrame
