import { Box } from 'grommet'
import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react'
import { FocusGroup, supportsFocusGroup } from '@microsoft/focusgroup-polyfill'

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
    if (!menubar.current.focusGroup) menubar.current.focusGroup = 'menubar block'

    // Native focusgroup support handles keyboard navigation without the
    // polyfill. Keep the property in sync for browsers that expose it.
    if (supportsFocusGroup()) {
      return
    }

    /*
     Polyfill focusgroup in Firefox, Safari, Edge and jsdom.
     Use the `FocusGroup` API because the exported polyfill conflicts
     with Grommet Layer's focus trap, breaking keyboard support if you
     open then close a Grommet modal.
    */
    menubar.current.setAttribute('role', 'menubar')
    const items = Array.from(menubar.current.querySelectorAll('button'))
    items.forEach(item => item.setAttribute('role', 'menuitem'))
    const itemCollection = {
      items: () => items.map(element => ({ element })),
      first: () => items[0] ?? null,
      last: () => items[items.length - 1] ?? null,
      next: current => items[items.indexOf(current) + 1] ?? null,
      previous: current => items[items.indexOf(current) - 1] ?? null,
      contains: element => items.includes(element)
    }
    const focusGroup = new FocusGroup(menubar.current, itemCollection, {
      definition: { behavior: 'menubar', wrap: true, axis: 'block', memory: true }
    })

    return () => focusGroup.disconnect()
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
