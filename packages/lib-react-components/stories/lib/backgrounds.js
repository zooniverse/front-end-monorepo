import addonBackgrounds from '@storybook/addon-backgrounds'
import zooTheme from '@zooniverse/grommet-theme'

const backgrounds = addonBackgrounds([
  { name: 'light', value: zooTheme.light.colors.background.default, default: true },
  { name: 'dark', value: zooTheme.dark.colors.background.default }
])

export default backgrounds
