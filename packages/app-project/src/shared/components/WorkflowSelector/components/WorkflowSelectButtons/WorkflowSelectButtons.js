import { Box } from 'grommet'
import { SpacedText } from '@zooniverse/react-components'
import WorkflowSelectButton from '../WorkflowSelectButton'
import en from './locales/en'
import counterpart from 'counterpart'
import PropTypes from 'prop-types'

counterpart.registerTranslations('en', en)

export default function WorkflowSelectButtons (props) {
  const {
    assignedWorkflowID = '',
    onSelect,
    workflowAssignmentEnabled = false,
    workflows = []
  } = props

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
          <SpacedText>{counterpart('WorkflowSelectButtons.unlocked')}</SpacedText>
          <Box
            as="ul"
            gap='xsmall'
            pad='none'
            style={{ listStyle: 'none' }}
          >
            {filteredWorkflowsByLevel.allowed.map((workflow) => (
              <li key={workflow.id}>
                <WorkflowSelectButton onSelect={onSelect} workflow={workflow} />
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
          <SpacedText>{counterpart('WorkflowSelectButtons.locked')}</SpacedText>
          <Box
            as="ul"
            gap='xsmall'
            pad='none'
            style={{ listStyle: 'none' }}
          >
            {filteredWorkflowsByLevel.disallowed.map((workflow) => (
              <li key={workflow.id}>
                <WorkflowSelectButton disabled={true} onSelect={onSelect} workflow={workflow} />
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
      gap='xsmall'
      margin={{ top: 'small' }}
      pad='none'
      style={{ listStyle: 'none' }}
      width={{ max: 'medium' }}
    >{workflows.map(workflow => (
        <li key={workflow.id}>
          <WorkflowSelectButton onSelect={onSelect} workflow={workflow} />
        </li>
      ))}
    </Box>
  )
}

WorkflowSelectButtons.propTypes = {
  assignedWorkflowID: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  workflows: PropTypes.arrayOf(PropTypes.object)
}