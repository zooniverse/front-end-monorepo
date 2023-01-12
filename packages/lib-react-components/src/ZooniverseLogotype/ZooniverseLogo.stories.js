import zooTheme from '@zooniverse/grommet-theme'
import { Box, Button, Grommet } from 'grommet'

import readme from './README.md'
import ZooniverseLogotype from './ZooniverseLogotype'

export default {
  title: 'Components/ZooniverseLogotype',
  component: ZooniverseLogotype,
  args: {
    id: 'The Zooniverse',
    width: 200,
  },
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export function ZooniverseLogotype_ ({ id, width }) {
  return (
    <Box align='center' justify='center' pad='medium'>
      <ZooniverseLogotype id={id} width={width} />
    </Box>
  )
}
