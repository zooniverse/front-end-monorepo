import React from 'react'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import SlideTutorial from './SlideTutorial'
// import readme from './README.md'
import backgrounds from '../../../../../.storybook/lib/backgrounds'
import { TutorialMediumFactory } from '../../../../../test/factories'

// TODO: add readme
const config = {
  notes: {
    // markdown: readme
  }
}

const darkThemeConfig = Object.assign({}, config, { backgrounds: backgrounds.darkDefault })

const medium = TutorialMediumFactory.build()
const stepWithMedium = {
  medium,
  step: {
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    medium: medium.id
  }
}
// TODO: add store connection for step navigation
// storiesOf('SlideTutorial', module)
//   .add('light theme', () => {
//     return (
//       <Grommet theme={zooTheme}>
//         <Box height='medium' width='large'>
//           <SlideTutorial
//             stepWithMedium={stepWithMedium}
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
//           <SlideTutorial
//             stepWithMedium={stepWithMedium}
//           />
//         </Box>
//       </Grommet>
//     )
//   }, darkThemeConfig)