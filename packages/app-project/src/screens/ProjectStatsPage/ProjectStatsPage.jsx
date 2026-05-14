import { arrayOf, shape, string } from 'prop-types'

import ChartContainer from './components/ChartContainer/ChartContainer'
import StandardLayout from '@shared/components/StandardLayout'
import ProjectStatistics from '@shared/components/ProjectStatistics'
import Workflows from './components/Workflows/Workflows'

function ProjectStatsPage({ workflows }) {

  return (
    <StandardLayout>
      <ChartContainer />
      <ProjectStatistics />
      <Workflows workflows={workflows} />
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
