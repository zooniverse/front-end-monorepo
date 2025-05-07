import Stats from './Stats.jsx'
import MaxWidthContent from '../MaxWidthContent/MaxWidthContent.jsx'

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
