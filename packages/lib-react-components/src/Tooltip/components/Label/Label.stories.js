import zooTheme from '@zooniverse/grommet-theme'
import { Box, Button, Grommet } from 'grommet'

import { default as LabelComponent } from './Label'

export default {
  title: 'Components/Tooltip/Label',
  component: LabelComponent,
  args: {
    arrow: true,
    dark: false,
    label: 'Hello'
  }
}

export function Label({ arrow, dark, label }){
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
      theme={Object.assign({}, zooTheme, { dark })}
      themeMode={(dark) ? 'dark' : 'light'}
    >
      <Box align='center' height='medium' justify='center' pad='medium'>
        <LabelComponent arrow={arrow} label={label} />
      </Box>
    </Grommet>
  )
}
