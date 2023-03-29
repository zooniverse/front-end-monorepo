import zooTheme from '@zooniverse/grommet-theme'
import { Box, Button, Grommet } from 'grommet'

import readme from './README.md'
import Tooltip from './Tooltip'

export default {
  title: 'Components / Tooltip',
  component: Tooltip,
  args: {
    dark: false,
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

export function Default({ dark, tooltipText }) {
  return (
    <TooltipStoryExample
      dark={dark}
      height='500px'
      tooltipText={tooltipText}
    />
  )
}

export function TipMovesWhenCloseToTheViewportEdge({ dark, tooltipText }) {
  return (
    <TooltipStoryExample
      dark={dark}
      tooltipText={tooltipText}
    />
  )
}

function TooltipStoryExample (props) {
  const { dark, height, tooltipText } = props
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box align='center' height={height} justify='center' pad='medium'>
        <Tooltip
          label={tooltipText}
        >
          <Button label='Focus me' onClick={() => { }} />
        </Tooltip>
      </Box>
    </Grommet>
  )
}
