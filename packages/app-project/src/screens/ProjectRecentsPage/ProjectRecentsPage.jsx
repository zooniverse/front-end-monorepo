import { Box, ResponsiveContext } from 'grommet'
import { useContext } from 'react'

import StandardLayout from '@shared/components/StandardLayout'
import ProjectAboutPageLayout from '../ProjectAboutPage/ProjectAboutPageLayout'

import RecentsHeading from './components/RecentsHeading'
import RecentsContainer from './components/RecentsContainer'

function ProjectRecentsPage() {
  const size = useContext(ResponsiveContext)

  return (
    <StandardLayout>
      <ProjectAboutPageLayout>
        <Box
          pad={{ horizontal: '20px' }}
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
