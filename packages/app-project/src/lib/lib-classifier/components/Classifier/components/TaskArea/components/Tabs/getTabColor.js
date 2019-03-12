import theme from 'styled-theming'
import zooTheme from '@zooniverse/grommet-theme'

function getTabColor (colorName) {
  return theme('mode', {
    dark: zooTheme.dark.colors.tabs[colorName],
    light: zooTheme.light.colors.tabs[colorName]
  })
}

export default getTabColor
