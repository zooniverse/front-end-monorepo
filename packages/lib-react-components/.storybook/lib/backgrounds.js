import zooTheme from '@zooniverse/grommet-theme'

const values = [
  {
    name: 'light',
    value: zooTheme.global.colors['light-1']
  },
  {
    name: 'dark',
    value: zooTheme.global.colors['dark-1']
  }
]

const backgrounds = {
  lightDefault: {
    default: 'light',
    values
  },
  darkDefault: {
    default: 'dark',
    values
  }
}

export default backgrounds