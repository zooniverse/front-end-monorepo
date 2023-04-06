import WorkflowAssignmentModalContainer from './WorkflowAssignmentModalContainer'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import asyncStates from '@zooniverse/async-states'

export default {
  title: 'Project App / Screens / Classify / Workflow Assignment / Assignment Modal',
  component: WorkflowAssignmentModalContainer,
  args: {
    dark: false
  }
}

export function Default({ dark }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={(dark) ? 'dark' : 'light'}
    >
      <WorkflowAssignmentModalContainer
        assignedWorkflowID='1234'
        currentWorkflowID='5678'
        loadingState={asyncStates.success}
        promptAssignment={() => true}
      />
    </Grommet>
  )
}
