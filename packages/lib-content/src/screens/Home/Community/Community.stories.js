import { Box } from 'grommet'
import mockDailyZooPosts from './dailyZooPosts.mock.json'
import mockZooBlogPosts from './zooBlogPosts.mock.json'
import CommunityContainer from './CommunityContainer.js'

export default {
  title: 'Screens / Home / Community',
  component: CommunityContainer
}

export const Default = () => {
  return (
    <Box background={{ light: 'white' }}>
      <CommunityContainer
        dailyZooPosts={mockDailyZooPosts}
        zooBlogPosts={mockZooBlogPosts}
      />
    </Box>
  )
}
