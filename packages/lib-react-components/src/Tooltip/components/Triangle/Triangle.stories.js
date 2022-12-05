import zooTheme from '@zooniverse/grommet-theme'
import { Box, Button, Grommet } from 'grommet'

import { default as TriangleComponent } from './Triangle'

export default {
  title: 'Components/Tooltip/Triangle',
  component: TriangleComponent,
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

export function Triangle({ dark, height, pointDirection }){
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
      theme={Object.assign({}, zooTheme, { dark })}
      themeMode={(dark) ? 'dark' : 'light'}
    >
      <Box align='center' height='medium' justify='center' pad='medium'>
        <TriangleComponent pointDirection={pointDirection} />
      </Box>
    </Grommet>
  )
}
