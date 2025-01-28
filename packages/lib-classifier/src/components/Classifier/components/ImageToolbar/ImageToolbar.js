import { Box } from 'grommet'
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
import { useKeyZoom } from '@hooks'

function storeMapper(classifierStore) {
  return {
    hasAnnotateTask: classifierStore.subjectViewer.hasAnnotateTask,
    rotation: classifierStore.subjectViewer.rotation
  }
}

// Generalized ...props here are css rules from the page layout
function ImageToolbar (props) {
  const { hasAnnotateTask, rotation } = useStores(storeMapper)
  const { onKeyZoom } = useKeyZoom(rotation)

  return (
    <Box
      height='min-content'
      onKeyDown={onKeyZoom}
      {...props}
    >
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
        pad='clamp(8px, 15%, 10px)'
        gap='2px'
      >
        {hasAnnotateTask && <AnnotateButton />}
        <MoveButton />
        <ZoomInButton />
        <ZoomOutButton />
        <RotateButton />
        <FullscreenButton show={false} />
        <ResetButton />
        <InvertButton />
      </Box>
      <FieldGuide />
    </Box>
  )
}

export default observer(ImageToolbar)
