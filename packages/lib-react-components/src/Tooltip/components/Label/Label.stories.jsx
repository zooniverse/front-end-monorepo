import { Box } from 'grommet'
import Label from './Label'

function ComponentDecorator(Story) {
  return (
    <Box align='center' height='medium' pad='medium'>
      <Story />
    </Box>
  )
}

export default {
  title: 'Components / Tooltip / Label',
  component: Label,
  decorators: [ComponentDecorator],
  args: {
    arrow: true,
    label: 'Hello'
  }
}

export const Default = {}

export const NoArrow = {
  args: {
    arrow: false
  }
}

export const BottomPlacement = {
  args: {
    'data-placement': 'bottom'
  }
}
