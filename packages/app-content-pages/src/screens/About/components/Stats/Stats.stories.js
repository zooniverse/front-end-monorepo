import Stats from './Stats.js'
import MaxWidthContent from '@shared/components/MaxWidthContent/MaxWidthContent.js'

export default {
  title: 'About / Stats',
  component: Stats
}

export const Default = () => {
  return (
    <MaxWidthContent>
      <Stats />
    </MaxWidthContent>
  )
}
