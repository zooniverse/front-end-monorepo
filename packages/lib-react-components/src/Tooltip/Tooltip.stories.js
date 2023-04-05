import { Box, Button } from 'grommet'

import readme from './README.md'
import Tooltip from './Tooltip'

export default {
  title: 'Components / Tooltip',
  component: Tooltip,
  args: {
    tooltipText: 'A helpful tip'
  },
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export function Default({ tooltipText }) {
  return <TooltipStoryExample height='500px' tooltipText={tooltipText} />
}

export function TipMovesWhenCloseToTheViewportEdge({ tooltipText }) {
  return <TooltipStoryExample tooltipText={tooltipText} />
}

function TooltipStoryExample(props) {
  const { height, tooltipText } = props
  return (
    <Box align='center' height={height} justify='center' pad='medium'>
      <Tooltip label={tooltipText}>
        <Button label='Focus me' onClick={() => {}} />
      </Tooltip>
    </Box>
  )
}
