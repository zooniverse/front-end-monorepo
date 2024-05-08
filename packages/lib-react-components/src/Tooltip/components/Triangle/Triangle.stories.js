import { Box } from 'grommet'
import Triangle from './Triangle'

function ComponentDecorator(Story) {
  return (
    <Box pad='medium'>
      <Story />
    </Box>
  )
}

export default {
  title: 'Components / Tooltip / Triangle',
  component: Triangle,
  decorators: [ComponentDecorator]
}

export const Default = {}

export const CustomColor = {
  args: {
    color: 'cyan'
  }
}

export const CustomWidth = {
  args: {
    width: 50
  }
}

export const CustomDirection = {
  args: {
    pointDirection: 'down'
  }
}
