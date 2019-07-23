import zooTheme from '@zooniverse/grommet-theme'

const lightDefault = [
  {
    default: true,
    name: 'light',
    value: zooTheme.global.colors['light-1']
  },
  {
    name: 'dark',
    value: zooTheme.global.colors['dark-1']
  }
]

const darkDefault = [
  {
    name: 'light',
    value: zooTheme.global.colors['light-1']
  },
  {
    default: true,
    name: 'dark',
    value: zooTheme.global.colors['dark-1']
  }
]

const backgrounds = {
  lightDefault,
  darkDefault
}

export default backgrounds