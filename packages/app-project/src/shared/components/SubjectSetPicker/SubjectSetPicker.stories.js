import { Box } from 'grommet'

import SubjectSetPicker from './'
import { mockWorkflow } from './helpers'

function DecoratedStory(Story) {
  return (
    <Box pad='small'>
      <Story />
    </Box>
  )
}

export default {
  title: 'Project App / Shared / Subject Set Picker',
  component: SubjectSetPicker,
  decorators: [DecoratedStory],
  args: {
    workflow: mockWorkflow
  }
}

export function Default({ workflow }) {
  return (
    <SubjectSetPicker
      baseUrl='/projects/test-owner/test-project/classify'
      workflow={workflow}
    />
  )
}

export function Tablet({ workflow }) {
  return (
    <SubjectSetPicker
      baseUrl='/projects/test-owner/test-project/classify'
      workflow={workflow}
    />
  )
}
Tablet.parameters = {
  viewport: {
    defaultViewport: 'ipad'
  }
}
