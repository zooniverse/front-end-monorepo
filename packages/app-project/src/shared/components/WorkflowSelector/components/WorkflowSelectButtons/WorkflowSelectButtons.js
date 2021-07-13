import { Box } from 'grommet'
import { SpacedText } from '@zooniverse/react-components'
import WorkflowSelectButton from '../WorkflowSelectButton'
import en from './locales/en'
import counterpart from 'counterpart'

counterpart.registerTranslations('en', en)

export default function WorkflowSelectButtons ({ assignedWorkflowID, onSelect, workflows = [] }) {
  let assignedWorkflow
  if (assignedWorkflowID) {
    assignedWorkflow = workflows.find((workflow) => {
      return workflow.id === assignedWorkflowID
    })
  }

  if (assignedWorkflow) {
    const filteredWorkflowsByLevel = { allowed: [], disallowed: [] }

    const assignedWorkflowLevel = assignedWorkflow.configuration.level
    workflows.forEach(workflow => {
      if (workflow.configuration.level <= assignedWorkflowLevel) {
        filteredWorkflowsByLevel.allowed.push(workflow)
      } else {
        filteredWorkflowsByLevel.disallowed.push(workflow)
      }
    })

    return (
      <>
        <Box
          alignSelf='start'
          fill='horizontal'
          gap='xsmall'
          margin={{ top: 'small' }}
          width={{ max: 'medium' }}
        >
          <SpacedText>{counterpart('WorkflowSelectButtons.unlocked')}</SpacedText>
          {filteredWorkflowsByLevel.allowed.map((workflow) => (
            <WorkflowSelectButton key={workflow.id} onSelect={onSelect} workflow={workflow} />
          ))}
        </Box>
        <Box
          alignSelf='start'
          fill='horizontal'
          gap='xsmall'
          margin={{ top: 'small' }}
          width={{ max: 'medium' }}
        >
          <SpacedText>{counterpart('WorkflowSelectButtons.locked')}</SpacedText>
          {filteredWorkflowsByLevel.disallowed.map((workflow) => (
            <WorkflowSelectButton key={workflow.id} disabled={true} onSelect={onSelect} workflow={workflow} />
          ))}
        </Box>
      </>
    )
  }


  return (
    <Box
      alignSelf='start'
      fill='horizontal'
      gap='xsmall'
      margin={{ top: 'small' }}
      width={{ max: 'medium' }}
    >{workflows.map(workflow =>
      <WorkflowSelectButton key={workflow.id} onSelect={onSelect} workflow={workflow} />)}
    </Box>
  )
}