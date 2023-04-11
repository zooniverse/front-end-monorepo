import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import mockStore from '@test/mockStore'

import ViewModeButton from './ViewModeButton'

export default {
  title: 'Subject Viewers / SeparateFramesViewer / ViewModeButton',
  component: ViewModeButton,
  args: {
    dark: false
  }
}

const storeWithSeparateFramesView = mockStore()
storeWithSeparateFramesView.subjectViewer.setSeparateFramesView(true)

export const SwitchToFlipbook = ({ dark }) => {
  const themeMode = dark ? 'dark' : 'light'
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={themeMode}
    >
      <Provider classifierStore={storeWithSeparateFramesView}>
        <ViewModeButton />
      </Provider>
    </Grommet>
  )
}

const storeWithFlipbookViewMode = mockStore()
storeWithFlipbookViewMode.subjectViewer.setSeparateFramesView(false)

export const SwitchToSeparateFrames = ({ dark }) => {
  const themeMode = dark ? 'dark' : 'light'
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={themeMode}
    >
      <Provider classifierStore={storeWithFlipbookViewMode}>
        <ViewModeButton />
      </Provider>
    </Grommet>
  )
}
