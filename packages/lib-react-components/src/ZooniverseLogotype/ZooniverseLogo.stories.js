import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'

import readme from './README.md'
import ZooniverseLogotype from './ZooniverseLogotype'

export default {
  title: 'Components / ZooniverseLogotype',
  component: ZooniverseLogotype,
  args: {
    dark: false,
    id: 'the-zooniverse',
    width: 200
  },
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export function Default({ dark, id, width }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={dark ? 'dark' : 'light'}
    >
      <Box align='center' justify='center' pad='medium'>
        <ZooniverseLogotype id={id} width={width} />
      </Box>
    </Grommet>
  )
}
