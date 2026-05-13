import { Box } from 'grommet'
import BillionClassificationsCountdown from './BillionClassificationsCountdown'

export default {
  title: 'Components / BillionClassificationsCountdown',
  component: BillionClassificationsCountdown
}

export const Default = () => {
  return (
    <Box width='min(100%, 45rem)'>
      <BillionClassificationsCountdown />
    </Box>
  )
}
