import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

import SubjectPicker from './SubjectPicker'

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
  title: 'Project App / Shared / Subject Picker',
  component: SubjectPicker
}

export function Default(args) {
  const { dark, ...props } = args
  return (
    <StoryContext theme={{ ...zooTheme, dark }}>
      <SubjectPicker
        {...props}
      />
    </StoryContext>
  )
}
Default.args = {
  active: true,
  closeFn: e => true,
  dark: false,
  subjectSet: {
    id: '15582',
    title: 'Anti-Slavery Letters: 1800-1839',
    metadata: {
      indexFields: 'date,title,creators'
    }
  },
  workflow: {
    id: '5329',
    display_name: 'Transcribe Text (Main Workflow)'
  }
}

export function Tablet(args) {
  const { dark, ...props } = args
  return (
    <StoryContext theme={{ ...zooTheme, dark }}>
      <SubjectPicker
        {...props}
      />
    </StoryContext>
  )
}
Tablet.parameters = { viewport: { defaultViewport: 'ipad' }}
Tablet.args = {
  active: true,
  closeFn: e => true,
  dark: false,
  subjectSet: {
    id: '15582',
    title: 'Anti-Slavery Letters: 1800-1839',
    metadata: {
      indexFields: 'date,title,creators'
    }
  },
  workflow: {
    id: '5329',
    display_name: 'Transcribe Text (Main Workflow)'
  }
}
