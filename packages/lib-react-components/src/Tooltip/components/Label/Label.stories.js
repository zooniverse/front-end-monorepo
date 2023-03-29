import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'

import Label from './Label'

export default {
  title: 'Components/Tooltip/Label',
  component: Label,
  args: {
    arrow: true,
    dark: false,
    label: 'Hello'
  }
}

export function DefaultLabel({ arrow, dark, label }) {
  return (
    <LabelStoryExample
      arrow={arrow}
      dark={dark}
      label={label}
    />
  )
}

function LabelStoryExample(props) {
  const { arrow, dark, label } = props
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
        <Label arrow={arrow} label={label} />
      </Box>
    </Grommet>
  )
}
