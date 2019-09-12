import zooTheme from '@zooniverse/grommet-theme'
import { base as baseTheme } from 'grommet'
import merge from 'lodash/merge'

const theme = merge({}, baseTheme, zooTheme)

export default theme
