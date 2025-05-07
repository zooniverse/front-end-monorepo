import { Box } from 'grommet'
import FeaturedProjects from './FeaturedProjects.jsx'

export default {
  title: 'Home  / FeaturedProjects',
  component: FeaturedProjects
}

export const Default = () => {
  return (
    <Box pad={{ horizontal: 'medium' }}>
      <FeaturedProjects />
    </Box>
  )
}
