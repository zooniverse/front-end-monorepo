import React from 'react'
import WorkflowAssignmentModal from './WorkflowAssignmentModal'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

export default {
  title: 'Workflow Assignment / Assignment Modal',
  component: WorkflowAssignmentModal,
  args: {
    active: true,
    dark: false
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    }
  }
}

export function Default({ dark, active }) {
  return (
    <Grommet
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      theme={zooTheme}
      themeMode={(dark) ? 'dark' : 'light'}
    >
      <WorkflowAssignmentModal active={active} />
    </Grommet>
  )
}
