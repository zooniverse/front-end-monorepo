import { Box, ResponsiveContext } from 'grommet'
import { useContext } from 'react'

import StandardLayout from '@shared/components/StandardLayout'
import RecentsContainer from './components/RecentsContainer'
import RecentsHeading from './components/RecentsHeading'
import ProjectAboutPageLayout from '../ProjectAboutPage/ProjectAboutPageLayout'

function ProjectRecentsPage() {
  const size = useContext(ResponsiveContext)

  return (
    <StandardLayout>
      <ProjectAboutPageLayout>
        <Box
          pad={size === 'small' ? 'none' : 'medium'}
          gap={size === 'small' ? 'none' : 'medium'}
          margin={{ bottom: 'large' }}
          width={{ width: '100%', max: '85rem' }}
        >
          <RecentsHeading />
          <RecentsContainer />
        </Box>
      </ProjectAboutPageLayout>
    </StandardLayout>
  )
}

export default ProjectRecentsPage

