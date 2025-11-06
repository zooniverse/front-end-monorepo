import { SpacedText } from '@zooniverse/react-components'
import { useTranslation } from 'next-i18next'
import { Box } from 'grommet'

import WorkflowSelectButton from '../WorkflowSelectButton'
import useAssignedLevel from '@hooks/useAssignedLevel.js'

function LevelingUpButtons({ assignedWorkflowID = '', workflows = [] }) {
  const { t } = useTranslation('components')

  const assignedWorkflowLevel = useAssignedLevel(assignedWorkflowID, workflows)
  const filteredWorkflowsByLevel = { allowed: [], disallowed: [] }

  if (assignedWorkflowLevel) {
    workflows.forEach(workflow => {
      const workflowLevel = workflow.configuration.level
      if (workflowLevel) {
        if (workflowLevel <= assignedWorkflowLevel) {
          filteredWorkflowsByLevel.allowed.push(workflow)
        } else {
          filteredWorkflowsByLevel.disallowed.push(workflow)
        }
      }
    })
  } else {
    workflows.forEach(workflow => {
      const workflowLevel = workflow.configuration.level
      if (workflowLevel === '1') {
        filteredWorkflowsByLevel.allowed.push(workflow)
      } else if (workflowLevel) {
        filteredWorkflowsByLevel.disallowed.push(workflow)
      }
    })
  }

  return (
    <>
      <Box
        alignSelf='start'
        fill='horizontal'
        margin={{ top: 'small' }}
        width={{ max: 'medium' }}
      >
        <SpacedText>
          {t('WorkflowSelector.WorkflowSelectButtons.unlocked')}
        </SpacedText>
        <Box as='ul' pad='0' gap='10px' style={{ listStyle: 'none' }}>
          {filteredWorkflowsByLevel.allowed.map(workflow => (
            <li key={workflow.id}>
              <WorkflowSelectButton workflow={workflow} />
            </li>
          ))}
        </Box>
      </Box>
      <Box
        alignSelf='start'
        fill='horizontal'
        gap='xsmall'
        margin={{ top: 'small' }}
        width={{ max: 'medium' }}
      >
        <SpacedText>
          {t('WorkflowSelector.WorkflowSelectButtons.locked')}
        </SpacedText>
        <Box as='ul' pad='0' gap='10px' style={{ listStyle: 'none' }}>
          {filteredWorkflowsByLevel.disallowed.map(workflow => (
            <li key={workflow.id}>
              <WorkflowSelectButton disabled={true} workflow={workflow} />
            </li>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default LevelingUpButtons
