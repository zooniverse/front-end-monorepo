import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'

import Triangle from './Triangle'

export default {
  title: 'Components / Tooltip / Triangle',
  component: Triangle,
  args: {
    dark: false,
    height: '500px'
  },
  argTypes: {
    pointDirection: {
      control: {
        type: 'select',
        options: ['up', 'down', 'left', 'right']
      }
    }
  }
}

export function DefaultTriangle({ dark, height, pointDirection }) {
  return (
    <TriangleStoryExample
      dark={dark}
      height={height}
      pointDirection={pointDirection}
    />
  )
}

function TriangleStoryExample(props) {
  const { dark, pointDirection } = props
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box align='center' height='medium' justify='center' pad='medium'>
        <Triangle pointDirection={pointDirection} />
      </Box>
    </Grommet>
  )
}
