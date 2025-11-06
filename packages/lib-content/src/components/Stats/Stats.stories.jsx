import Stats from './Stats'
import MaxWidthContent from '../MaxWidthContent/MaxWidthContent'

export default {
  title: 'Shared / Stats',
  component: Stats
}

export const Default = () => {
  return (
    <MaxWidthContent>
      <Stats />
    </MaxWidthContent>
  )
}
