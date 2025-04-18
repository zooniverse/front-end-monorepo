import { Box } from 'grommet'
import FeaturedProjects from './FeaturedProjects.jsx'

export default {
  title: 'Home  / FeaturedProjects',
  component: FeaturedProjects
}

/* This Story makes a real API request to panoptes. It could use MSW in the future */
export const Default = () => {
  return (
    <Box pad={{ horizontal: 'medium' }}>
      <FeaturedProjects />
    </Box>
  )
}
