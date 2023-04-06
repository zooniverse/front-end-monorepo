import { Box } from 'grommet'
import PropTypes from 'prop-types'

import AnnotateButton from './components/AnnotateButton'
import InvertButton from './components/InvertButton'
import MoveButton from '@components/Classifier/components/ImageToolbar/components/MoveButton'
import ResetButton from '@components/Classifier/components/ImageToolbar/components/ResetButton'
import RotateButton from '@components/Classifier/components/ImageToolbar/components/RotateButton'
import withKeyZoom from '@components/Classifier/components/withKeyZoom'
import ZoomInButton from '@components/Classifier/components/ImageToolbar/components/ZoomInButton'
import ZoomOutButton from '@components/Classifier/components/ImageToolbar/components/ZoomOutButton'

const DEFAULT_HANDLER = () => true

function SeparateFrameImageToolbar({
  separateFrameAnnotate = false,
  separateFrameEnableAnnotate = DEFAULT_HANDLER,
  separateFrameInvert = DEFAULT_HANDLER,
  separateFrameResetView = DEFAULT_HANDLER,
  separateFrameRotate = DEFAULT_HANDLER,
  separateFrameZoomIn = DEFAULT_HANDLER,
  separateFrameZoomOut = DEFAULT_HANDLER
}) {
  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'white'
      }}
      border={{
        color: {
          dark: 'dark-1',
          light: 'light-3'
        },
        side: 'all'
      }}
      direction='column'
      fill
      height='min-content'
      pad='clamp(8px, 15%, 10px)'
    >
      <AnnotateButton separateFrameAnnotate={separateFrameAnnotate} separateFrameEnableAnnotate={separateFrameEnableAnnotate} />
      <MoveButton />
      <ZoomInButton separateFrameZoomIn={separateFrameZoomIn} />
      <ZoomOutButton separateFrameZoomOut={separateFrameZoomOut} />
      <RotateButton separateFrameRotate={separateFrameRotate} />
      <ResetButton separateFrameResetView={separateFrameResetView} />
      <InvertButton separateFrameInvert={separateFrameInvert} />
    </Box>
  )
}

export default withKeyZoom(SeparateFrameImageToolbar)

SeparateFrameImageToolbar.propTypes = {
  separateFrameInvert: PropTypes.func,
  separateFrameResetView: PropTypes.func,
  separateFrameRotate: PropTypes.func,
  separateFrameZoomIn: PropTypes.func,
  separateFrameZoomOut: PropTypes.func
}
