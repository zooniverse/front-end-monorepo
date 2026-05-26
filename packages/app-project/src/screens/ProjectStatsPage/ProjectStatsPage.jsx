import { arrayOf, shape, string } from 'prop-types'
import { Box, ResponsiveContext } from 'grommet'
import { useContext } from 'react'

import ChartContainer from './components/ChartContainer/ChartContainer'
import StandardLayout from '@shared/components/StandardLayout'
import ProjectStatistics from '@shared/components/ProjectStatistics'
import Workflows from './components/Workflows/Workflows'
import ProjectAboutPageLayout from '../ProjectAboutPage/ProjectAboutPageLayout'

function ProjectStatsPage({ workflows }) {
  const size = useContext(ResponsiveContext)

  return (
    <StandardLayout>
      <ProjectAboutPageLayout>
        <Box
          pad={size === 'small' ? 'none' : 'medium'}
          gap={size === 'small' ? 'none' : 'medium'}
          margin={{ bottom: 'large' }}
          width={{ max: '85rem' }}
        >
          <ChartContainer workflows={workflows} />
          <ProjectStatistics hideLink titleLevel={3} />
          <Workflows workflows={workflows} />
        </Box>
      </ProjectAboutPageLayout>
    </StandardLayout>
  )
}

export default ProjectStatsPage

ProjectStatsPage.propTypes = {
  workflows: arrayOf(
    shape({
      id: string.isRequired
    })
  )
}
