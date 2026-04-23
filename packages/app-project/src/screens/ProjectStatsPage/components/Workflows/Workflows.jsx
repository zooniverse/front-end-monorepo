import { useTranslation } from 'next-i18next'
import { arrayOf, shape, string } from 'prop-types'

import ContentBox from '@shared/components/ContentBox'
import Workflow from './Workflow'

/*
  Need to fetch:
  - subjects retired / total subjects:
      workflow.retired_set_member_subjects_count / workflow.subjects_count
  - retirement limit: workflow.retirement.criteria or workflow.retirement.options.count
  - calculate ETC or ToC
  - Also grab workflow.classifications_count for the top page header
*/

function Workflows({ workflows = [] }) {
  const { t } = useTranslation('screens')

  console.log('WORKFLOW', workflows[0])

  return (
    <ContentBox title={t('ProjectStats.workflows.title')}>
      {workflows.map(workflow => (
        <Workflow
          key={workflow.id}
          displayName={workflow.displayName}
          completeness={workflow.completeness}
        />
      ))}
    </ContentBox>
  )
}

export default Workflows

Workflows.propTypes = {
  workflows: arrayOf(
    shape({
      id: string.isRequired
    })
  )
}
