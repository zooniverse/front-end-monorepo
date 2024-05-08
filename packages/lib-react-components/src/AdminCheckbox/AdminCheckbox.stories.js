import { Box } from 'grommet'

import AdminCheckbox from './AdminCheckbox'

export default {
  title: 'Components / AdminCheckbox',
  component: AdminCheckbox,
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
