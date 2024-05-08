import { Box, Button } from 'grommet'
import Tooltip from './Tooltip'

export default {
  title: 'Components / Tooltip',
  component: Tooltip,
  args: {
    btnLabel: 'Focus me',
    label: 'A helpful tip'
  }
}

export const Default = {
  render: args => (
    <Box fill align='center' justify='center'>
      <Tooltip label={args.label}>
        <Button label={args.btnLabel} onClick={() => {}} />
      </Tooltip>
    </Box>
  )
}

export const TipMovesWhenCloseToTheViewportEdge = {
  render: args => (
    <Box align='center' justify='center' pad='medium'>
      <Tooltip label={args.label}>
        <Button label={args.btnLabel} onClick={() => {}} />
      </Tooltip>
    </Box>
  )
}
