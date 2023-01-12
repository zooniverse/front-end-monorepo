import zooTheme from '@zooniverse/grommet-theme'
import { Box, Button, Grommet } from 'grommet'

import readme from './README.md'
import ZooniverseLogo from './ZooniverseLogo'

export default {
  title: 'Components/ZooniverseLogo',
  component: ZooniverseLogo,
  args: {
    id: 'The Zooniverse',
    size: '1em',
  },
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export function ZooniverseLogo_ ({ id, size }) {
  return (
    <Box align='center' justify='center' pad='medium'>
      <ZooniverseLogo id={id} size={size} />
    </Box>
  )
}
