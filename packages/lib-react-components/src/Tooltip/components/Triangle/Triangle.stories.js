import { Box } from 'grommet'

import Triangle from './Triangle'

export default {
  title: 'Components / Tooltip / Triangle',
  component: Triangle,
  args: {
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

export function DefaultTriangle({ height, pointDirection }) {
  return (
    <TriangleStoryExample height={height} pointDirection={pointDirection} />
  )
}

function TriangleStoryExample({ pointDirection }) {
  return (
    <Box align='center' height='medium' justify='center' pad='medium'>
      <Triangle pointDirection={pointDirection} />
    </Box>
  )
}
