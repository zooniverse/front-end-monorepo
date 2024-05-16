import { Box } from 'grommet'
import mockData from './blogPosts.mock.json'
import CommunityContainer from './CommunityContainer.js'

export default {
  title: 'Screens / Home / Community',
  component: CommunityContainer
}

export const Default = () => {
  return (
    <Box background={{ light: 'white' }}>
      <CommunityContainer blogPosts={mockData} />
    </Box>
  )
}
