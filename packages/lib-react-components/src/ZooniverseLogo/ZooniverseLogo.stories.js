import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'

import readme from './README.md'
import ZooniverseLogo from './ZooniverseLogo'

export default {
  title: 'Components / ZooniverseLogo',
  component: ZooniverseLogo,
  args: {
    dark: false,
    id: 'the-zooniverse',
    size: '200px'
  },
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export function Default({ dark, id, size }) {
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
        <ZooniverseLogo id={id} size={size} />
      </Box>
    </Grommet>
  )
}
