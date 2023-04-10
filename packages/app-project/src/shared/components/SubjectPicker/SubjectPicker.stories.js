import { Box } from 'grommet'
import SubjectPicker from './SubjectPicker'

function DecoratedStory(Story) {
  return (
    <Box pad='small'>
      <Story />
    </Box>
  )
}

export default {
  title: 'Project App / Shared / Subject Picker',
  component: SubjectPicker,
  decorators: [DecoratedStory]
}

export function Default(args) {
  const { ...props } = args
  return <SubjectPicker {...props} />
}
Default.args = {
  active: true,
  baseUrl: '/projects/test-owner/test-project/classify/workflow/12345',
  closeFn: e => true,
  subjectSet: {
    id: '15582',
    title: 'Anti-Slavery Letters: 1800-1839',
    metadata: {
      indexFields: 'date,title,creators'
    }
  },
  workflow: {
    id: '5329',
    display_name: 'Transcribe Text (Main Workflow)'
  }
}

export function Tablet(args) {
  const { ...props } = args
  return <SubjectPicker {...props} />
}
Tablet.parameters = { viewport: { defaultViewport: 'ipad' } }
Tablet.args = {
  active: true,
  baseUrl: '/projects/test-owner/test-project/classify/workflow/12345',
  closeFn: e => true,
  subjectSet: {
    id: '15582',
    title: 'Anti-Slavery Letters: 1800-1839',
    metadata: {
      indexFields: 'date,title,creators'
    }
  },
  workflow: {
    id: '5329',
    display_name: 'Transcribe Text (Main Workflow)'
  }
}
