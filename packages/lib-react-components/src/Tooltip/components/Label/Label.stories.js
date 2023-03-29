import { Box } from 'grommet'

import Label from './Label'

export default {
  title: 'Components/Tooltip/Label',
  component: Label,
  args: {
    arrow: true,
    label: 'Hello'
  }
}

export function DefaultLabel({ arrow, label }) {
  return <LabelStoryExample arrow={arrow} label={label} />
}

function LabelStoryExample(props) {
  const { arrow, label } = props
  return (
    <Box align='center' height='medium' justify='center' pad='medium'>
      <Label arrow={arrow} label={label} />
    </Box>
  )
}
