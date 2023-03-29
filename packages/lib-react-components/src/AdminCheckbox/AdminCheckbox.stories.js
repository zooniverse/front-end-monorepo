import { Box } from 'grommet'

import AdminCheckbox from './AdminCheckbox'
import readme from './README.md'

export default {
  title: 'Components / AdminCheckbox',
  component: AdminCheckbox,
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export const Default = () => {
  return (
    <Box align='center' justify='center' height='medium'>
      <AdminCheckbox checked={false} />
    </Box>
  )
}

export const Checked = () => {
  return (
    <Box align='center' justify='center' height='medium'>
      <AdminCheckbox checked />
    </Box>
  )
}
