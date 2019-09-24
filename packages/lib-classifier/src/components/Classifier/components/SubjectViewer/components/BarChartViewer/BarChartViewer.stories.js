import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, number } from '@storybook/addon-knobs';
import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import BarChartViewer from './BarChartViewer'
import mockData from './mockData'
// import readme from './README.md'
import backgrounds from '../../../../../../../.storybook/lib/backgrounds'

const config = {
  // notes: {
  //   markdown: readme
  // }
}

const darkThemeConfig = Object.assign({}, config, { backgrounds: backgrounds.darkDefault })

const { data } = mockData

const stories = storiesOf('BarChartViewer', module)

stories.addDecorator(withKnobs)

stories.add('light theme', () => {
    return (
      <Grommet theme={zooTheme}>
        <Box
          background={text('container background', 'white')}
          height='medium'
          pad='small'
          width='large'
        >
          <BarChartViewer
            axis={{
              label: 'Letters'
            }}
            backgroundFill={{
              dark: text('background dark theme fill', ''),
              light: text('background light theme fill', '')
            }}
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
        <Box
          background={text('container background', darkZooTheme.global.colors['dark-3'])}
          height='medium'
          pad='small'
          width='large'
        >
          <BarChartViewer
            axis={{
              label: 'Letters'
            }}
            backgroundFill={{
              dark: text('background dark theme fill', ''),
              light: text('background light theme fill', '')
            }}
            data={data}
          />
        </Box>
      </Grommet>
    )
  }, darkThemeConfig)
