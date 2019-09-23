import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number } from '@storybook/addon-knobs';
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import BarChartViewer from './BarChartViewer'
import mockData from './mockData'
// import readme from './README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'

// const config = {
//   notes: {
//     markdown: readme
//   }
// }

// const darkThemeConfig = Object.assign({}, config, { backgrounds: backgrounds.darkDefault })

const { data } = mockData

const stories = storiesOf('BarChartViewer', module)

stories.addDecorator(withKnobs)

stories.add('light theme', () => {
    return (
      <Grommet theme={zooTheme}>
        <Box height='medium' width='large'>
          <BarChartViewer
            backgroundFill={text('background fill', 'white')}
            data={data}
          />
        </Box>
      </Grommet>
    )
  })
  .add('dark theme', () => {
    const darkZooTheme = Object.assign({}, zooTheme, { dark: true })
    return (
      <Grommet theme={darkZooTheme}>
        <Box height='medium' width='large'>
          <BarChartViewer
            backgroundFill={text('background fill', 'white')}
            data={data}
          />
        </Box>
      </Grommet>
    )
  })
