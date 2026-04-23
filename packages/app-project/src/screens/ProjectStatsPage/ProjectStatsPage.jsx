import { useTranslation } from 'next-i18next'
import { arrayOf, shape, string } from 'prop-types'

import StandardLayout from '@shared/components/StandardLayout'
import ProjectStatistics from '@shared/components/ProjectStatistics'
import Workflows from './components/Workflows/Workflows'

function ProjectStatsPage({ projectDisplayName, projectId, workflows }) {
  const { t } = useTranslation('screens')

  return (
    <StandardLayout>
      <ProjectStatistics />
      <Workflows workflows={workflows} />
    </StandardLayout>
  )
}

ProjectStatsPage.propTypes = {
  projectDisplayName: string,
  projectId: string
}

export default ProjectStatsPage

Workflows.propTypes = {
  projectDisplayName: string,
  projectId: string,
  workflows: arrayOf(
    shape({
      id: string.isRequired
    })
  )
}
