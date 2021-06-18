import React from 'react'
import WorkflowAssignmentModalContainer from './WorkflowAssignmentModalContainer'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

export default {
  title: 'Workflow Assignment / Assignment Modal',
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
    promptAssignment: () => true
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
      <WorkflowAssignmentModalContainer projectPreferences={projectPreferences} />
    </Grommet>
  )
}
