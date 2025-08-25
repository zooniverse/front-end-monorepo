import { Box } from 'grommet'

import readme from './README.md'
import ZooniverseLogo from './ZooniverseLogo'

export default {
  title: 'Components / ZooniverseLogo',
  component: ZooniverseLogo,
  args: {
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

export function Default({ id, size }) {
  return (
    <Box align='center' justify='center' pad='medium'>
      <ZooniverseLogo id={id} size={size} />
    </Box>
  )
}
