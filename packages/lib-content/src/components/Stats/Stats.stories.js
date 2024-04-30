import Stats from './Stats.js'
import MaxWidthContent from '../MaxWidthContent/MaxWidthContent.js'

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
