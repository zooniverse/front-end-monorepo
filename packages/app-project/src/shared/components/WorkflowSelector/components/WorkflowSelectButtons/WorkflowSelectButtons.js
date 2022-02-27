import { Box } from 'grommet'
import { SpacedText } from '@zooniverse/react-components'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import { useTranslation } from 'next-i18next'

import WorkflowSelectButton from '../WorkflowSelectButton'

function WorkflowSelectButtons ({
  assignedWorkflowID = '',
  gap = 'xsmall',
  onSelect,
  workflowAssignmentEnabled = false,
  theme = {
    global: {
      edgeSize: {}
    }
  },
  workflows = []
}) {
  const { t } = useTranslation('components')

  const listStyle = {
    gap: theme.global.edgeSize[gap],
    listStyle: 'none'
  }

  if (workflowAssignmentEnabled) {
    let assignedWorkflow
    if (assignedWorkflowID) {
      assignedWorkflow = workflows.find((workflow) => {
        return workflow.id === assignedWorkflowID
      })
    }
    const filteredWorkflowsByLevel = { allowed: [], disallowed: [] }

    const assignedWorkflowLevel = assignedWorkflow?.configuration?.level
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
          <SpacedText>{t('WorkflowSelector.WorkflowSelectButtons.unlocked')}</SpacedText>
          <Box
            as="ul"
            pad='none'
            style={listStyle}
          >
            {filteredWorkflowsByLevel.allowed.map((workflow) => (
              <li key={workflow.id}>
                <WorkflowSelectButton
                  onSelect={onSelect}
                  workflow={workflow}
                />
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
          <SpacedText>{t('WorkflowSelector.WorkflowSelectButtons.locked')}</SpacedText>
          <Box
            as="ul"
            pad='none'
            style={listStyle}
          >
            {filteredWorkflowsByLevel.disallowed.map((workflow) => (
              <li key={workflow.id}>
                <WorkflowSelectButton
                  disabled={true}
                  onSelect={onSelect}
                  workflow={workflow}
                />
              </li>
            ))}
          </Box>
        </Box>
      </>
    )
  }

  return (
    <Box
      alignSelf='start'
      as="ul"
      fill='horizontal'
      margin={{ top: 'small' }}
      pad='none'
      style={listStyle}
      width={{ max: 'medium' }}
    >
      {workflows.map(workflow => (
        <li key={workflow.id}>
          <WorkflowSelectButton
            onSelect={onSelect}
            workflow={workflow}
          />
        </li>
      ))}
    </Box>
  )
}

WorkflowSelectButtons.propTypes = {
  assignedWorkflowID: PropTypes.string,
  gap: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  workflows: PropTypes.arrayOf(PropTypes.object)
}

export default withTheme(WorkflowSelectButtons)
export { WorkflowSelectButtons }
