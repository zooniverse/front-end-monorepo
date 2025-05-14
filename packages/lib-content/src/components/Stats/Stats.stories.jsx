import Stats from './Stats.jsx'
import MaxWidthContent from '../MaxWidthContent/MaxWidthContent.jsx'

export default {
  title: 'Shared / Stats',
  component: Stats
}

/* These API requests return actual data. They are not mocked, but could be with MSW in the future */
export const Default = () => {
  return (
    <MaxWidthContent>
      <Stats />
    </MaxWidthContent>
  )
}
