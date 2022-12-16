import { Box } from 'grommet'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { useStores } from '@hooks'

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

function storeMapper(store) {
  const {
    viewerWidth
  } = store.subjectViewer

  return {
    viewerWidth
  }
}

function ImageToolbar () {
  const { viewerWidth } = useStores(storeMapper)

  return (
    <Box height='min-content'>
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
        pad={viewerWidth === 'small' ? '5px' : '10px'}
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
    </Box>
  )
}

export default withKeyZoom(observer(ImageToolbar))
