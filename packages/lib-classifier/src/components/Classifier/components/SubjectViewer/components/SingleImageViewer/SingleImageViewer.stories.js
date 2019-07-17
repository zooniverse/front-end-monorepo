import React from 'react'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import SingleImageViewer from './SingleImageViewer'
// import readme from './README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'

// TODO: add readme
const config = {
  notes: {
    // markdown: readme
  }
}

const darkThemeConfig = Object.assign({}, config, { backgrounds: backgrounds.darkDefault })

// TODO: add store connection for drawing because of the interaction layer
// storiesOf('SingleImageViewer', module)
//   .add('light theme', () => {
//     return (
//       <Grommet theme={zooTheme}>
//         <Box height='medium' width='large'>
//           <SingleImageViewer
//             url='http://placekitten.com/500/300'
//           />
//         </Box>
//       </Grommet>
//     )
//   }, config)
//   .add('dark theme', () => {
//     const darkZooTheme = Object.assign({}, zooTheme, { dark: true })
//     return (
//       <Grommet theme={darkZooTheme}>
//         <Box height='medium' width='large'>
//           <SingleImageViewer
//             url='http://placekitten.com/500/300'
//           />
//         </Box>
//       </Grommet>
//     )
//   }, darkThemeConfig)