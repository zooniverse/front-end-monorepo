import { Box } from 'grommet'

import readme from './README.md'
import ZooniverseLogotype from './ZooniverseLogotype'

export default {
  title: 'Components / ZooniverseLogotype',
  component: ZooniverseLogotype,
  args: {
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

export function Default({ id, width }) {
  return (
    <Box align='center' justify='center' pad='medium'>
      <ZooniverseLogotype id={id} width={width} />
    </Box>
  )
}
