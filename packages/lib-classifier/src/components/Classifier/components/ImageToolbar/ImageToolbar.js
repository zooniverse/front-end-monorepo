import { Box } from 'grommet'
import styled from 'styled-components'

import FieldGuide from '../FieldGuide'
import AnnotateButton from './components/AnnotateButton'
import FullscreenButton from './components/FullscreenButton'
import InvertButton from './components/InvertButton'
import MoveButton from './components/MoveButton'
import ResetButton from './components/ResetButton'
import RotateButton from './components/RotateButton'
import ZoomInButton from './components/ZoomInButton'
import ZoomOutButton from './components/ZoomOutButton'
import withKeyZoom from '../withKeyZoom'

const StickyBox = styled(Box)`
  position: sticky;
  top: 10px;
  grid-area: toolbar;
`

function ImageToolbar () {
  return (
    <StickyBox height='min-content'>
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
        pad='10px' // should be responsive and the same as FieldGuideButton
      >
        <AnnotateButton />
        <MoveButton />
        <ZoomInButton />
        <ZoomOutButton />
        <RotateButton />
        <FullscreenButton disabled />
        <ResetButton />
        <InvertButton />
      </Box>
      <FieldGuide />
    </StickyBox>
  )
}

export default withKeyZoom(ImageToolbar)
