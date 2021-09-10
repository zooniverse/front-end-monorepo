import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

import SubjectSetPicker from './'
import * as subcomponents from './components'
import { mockWorkflow } from './helpers'

function StoryContext (props) {
  const { children, theme } = props

  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={theme}
      themeMode={(theme.dark) ? 'dark' : 'light'}
    >
      {children}
    </Grommet>
  )
}

export default {
  title: 'Project App / Shared / Subject Set Picker',
  component: SubjectSetPicker,
  subcomponents,
  args: {
    dark: false,
    workflow: mockWorkflow
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

export function Default({ dark, workflow }) {
  return (
    <StoryContext theme={{ ...zooTheme, dark }}>
      <SubjectSetPicker
        baseUrl='/projects/test-owner/test-project/classify'
        workflow={workflow}
      />
    </StoryContext>
  )
}

export function Tablet({ active, dark, title, workflow }) {
  return (
    <StoryContext theme={{ ...zooTheme, dark }}>
      <SubjectSetPicker
        baseUrl='/projects/test-owner/test-project/classify'
        workflow={workflow}
      />
    </StoryContext>
  )
}
Tablet.parameters = {
  viewport: {
    defaultViewport: 'ipad'
  }
}

