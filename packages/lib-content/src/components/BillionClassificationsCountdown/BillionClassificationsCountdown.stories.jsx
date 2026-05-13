import BillionClassificationsCountdown from './BillionClassificationsCountdown'
import MaxWidthContent from '../MaxWidthContent/MaxWidthContent'

export default {
  title: 'Shared / BillionClassificationsCountdown',
  component: BillionClassificationsCountdown
}

export const Default = () => {
  return (
    <MaxWidthContent>
      <BillionClassificationsCountdown />
    </MaxWidthContent>
  )
}
