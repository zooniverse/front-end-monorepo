import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number } from '@storybook/addon-knobs';
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import BarChartViewer from './BarChartViewer'
import mockData, { mockDataWithColor } from './mockData'
// import readme from './README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'

const config = {
  // notes: {
  //   markdown: readme
  // }
}

const darkThemeConfig = Object.assign({}, config, { backgrounds: backgrounds.darkDefault })


const stories = storiesOf('BarChartViewer', module)

stories.addDecorator(withKnobs)

stories.add('light theme', () => {
    const { data, options } = mockData
    return (
      <Grommet theme={zooTheme}>
        <Box
          background={text('container background', 'white')}
          height='medium'
          pad='small'
          width='large'
        >
          <BarChartViewer
            backgroundFill={{
              dark: text('background dark theme fill', ''),
              light: text('background light theme fill', '')
            }}
            data={data}
            options={options}
          />
        </Box>
      </Grommet>
    )
  })
  .add('dark theme', () => {
    const { data, options } = mockData
    const darkZooTheme = Object.assign({}, zooTheme, { dark: true })
    return (
      <Grommet theme={darkZooTheme}>
        <Box
          background={text('container background', darkZooTheme.global.colors['dark-3'])}
          height='medium'
          pad='small'
          width='large'
        >
          <BarChartViewer
            backgroundFill={{
              dark: text('background dark theme fill', ''),
              light: text('background light theme fill', '')
            }}
            data={data}
            options={options}
          />
        </Box>
      </Grommet>
    )
  }, darkThemeConfig)
  .add('Custom theme and colors', () => {
    const { data, options } = mockDataWithColor
    const customTheme = {
      dark: false,
      global: {
        colors: {},
        font: {
          family: 'Arial, Helvetica, sans-serif'
        }
      }
    }
    return (
      <Grommet theme={customTheme}>
        <Box
          background={text('container background', '#fffff0')}
          height='medium'
          pad='small'
          width='large'
        >
          <BarChartViewer
            backgroundFill={{
              dark: text('background dark theme fill', '#000000'),
              light: text('background light theme fill', '#fffff0')
            }}
            data={data}
            options={options}
          />
        </Box>
      </Grommet>
    )
  })
