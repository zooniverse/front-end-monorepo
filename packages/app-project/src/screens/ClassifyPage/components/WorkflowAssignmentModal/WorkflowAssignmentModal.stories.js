import WorkflowAssignmentModalContainer from './WorkflowAssignmentModalContainer'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import asyncStates from '@zooniverse/async-states'

export default {
  title: 'Project App / Screens / Classify / Workflow Assignment / Assignment Modal',
  component: WorkflowAssignmentModalContainer,
  args: {
    dark: false
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

export function Default({ dark }) {
  const projectPreferences = {
    promptAssignment: () => true,
    settings: {
      workflow_id: '1234'
    }
  }
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
