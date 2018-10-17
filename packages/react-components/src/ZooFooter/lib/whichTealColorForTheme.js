import theme from 'styled-theming'
import zooTheme from '@zooniverse/grommet-theme'

const whichTealColorForTheme = theme('mode', {
  light: zooTheme.global.colors.brand,
  dark: zooTheme.global.colors.lightTeal
})

export default whichTealColorForTheme
