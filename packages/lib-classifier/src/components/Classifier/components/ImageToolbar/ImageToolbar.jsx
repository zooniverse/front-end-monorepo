import { Box } from 'grommet'
import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react'
import { polyfill } from '@microsoft/focusgroup-polyfill'

import FieldGuide from '../FieldGuide'
import AnnotateButton from './components/AnnotateButton'
import FullscreenButton from './components/FullscreenButton'
import InvertButton from './components/InvertButton'
import MoveButton from './components/MoveButton'
import ResetButton from './components/ResetButton'
import RotateButton from './components/RotateButton'
import ZoomInButton from './components/ZoomInButton'
import ZoomOutButton from './components/ZoomOutButton'
import { useStores } from '@hooks'

function storeMapper(classifierStore) {
  return {
    hasAnnotateTask: classifierStore.subjectViewer.hasAnnotateTask
  }
}

// Generalized ...props here are css rules from the page layout
function ImageToolbar (props) {
  const menubar = useRef(null)
  const { hasAnnotateTask } = useStores(storeMapper)

  useEffect(function addFocusGroup() {
    if (!menubar.current) return
    menubar.current.setAttribute('focusgroup', 'menubar block')
    menubar.current.setAttribute('aria-orientation', 'vertical')
    // polyfill focusgroup in Safari, Firefox and Edge.
    polyfill(menubar.current)
    if (!menubar.current.focusGroup) {
      menubar.current.focusGroup = 'menubar block'
    }
  }, [])

  return (
    <Box
      height='min-content'
      {...props}
    >
      <Box
        ref={menubar}
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
