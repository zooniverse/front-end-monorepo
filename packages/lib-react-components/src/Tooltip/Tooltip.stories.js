import zooTheme from '@zooniverse/grommet-theme'
import { Box, Button, Grommet } from 'grommet'

import readme from './README.md'
import { default as TooltipComponent } from './Tooltip'

export default {
  title: 'Components/Tooltip',
  component: TooltipComponent,
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

export function Tooltip({ dark, tooltipText }) {
  return (
    <TooltipStoryExample
      dark={dark}
      height='500px'
      tooltipText={tooltipText}
    />
  )
}

export function RotatedWhenCloseToTheViewportEdge({ dark, tooltipText }) {
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
      theme={Object.assign({}, zooTheme, { dark })}
      themeMode={(dark) ? 'dark' : 'light'}
    >
      <Box align='center' height={height} justify='center' pad='medium'>
        <TooltipComponent
          label={tooltipText}
        >
          <Button label='Focus me' onClick={() => { }} />
        </TooltipComponent>
      </Box>
    </Grommet>
  )
}
