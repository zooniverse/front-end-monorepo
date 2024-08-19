import { Box } from 'grommet'
import { arrayOf, bool, object, string } from 'prop-types'

import WorkflowSelectButton from '../WorkflowSelectButton'
import LevelingUpButtons from './LevelingUpButtons.js'

function WorkflowSelectButtons({
  assignedWorkflowID = '',
  workflowAssignmentEnabled = false,
  workflows = []
}) {
  return (
    <>
      {workflowAssignmentEnabled ? (
        <LevelingUpButtons
          assignedWorkflowID={assignedWorkflowID}
          workflows={workflows}
        />
      ) : (
        <Box
          alignSelf='start'
          as='ul'
          gap='10px'
          fill='horizontal'
          margin={{ top: 'small' }}
          pad='0'
          style={{ listStyle: 'none' }}
          width={{ max: 'medium' }}
        >
          {workflows.map(workflow => (
            <li key={workflow.id}>
              <WorkflowSelectButton workflow={workflow} />
            </li>
          ))}
        </Box>
      )}
    </>
  )
}

WorkflowSelectButtons.propTypes = {
  assignedWorkflowID: string,
  workflowAssignmentEnabled: bool,
  workflows: arrayOf(object)
}

export default WorkflowSelectButtons
