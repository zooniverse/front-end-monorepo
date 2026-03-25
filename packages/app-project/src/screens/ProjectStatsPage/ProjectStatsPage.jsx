import { useTranslation } from 'next-i18next'
import { string } from 'prop-types'

import StandardLayout from '@shared/components/StandardLayout'

function ProjectStatsPage({ projectDisplayName, projectId }) {
  const { t } = useTranslation('screens')

  return <StandardLayout />
}

ProjectStatsPage.propTypes = {
  projectDisplayName: string,
  projectId: string
}

export default ProjectStatsPage
