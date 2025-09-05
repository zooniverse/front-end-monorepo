import { Box } from 'grommet'
import WorkflowIsFinishedBanner from './WorkflowIsFinishedBanner'
import readme from '../../README.md'
import { SubjectFactory } from '@test/factories'

const subject = SubjectFactory.build({
  finished_workflow: true
})

export default {
  title: 'Banners / WorkflowIsFinishedBanner',
  component: WorkflowIsFinishedBanner,
  args: {
    subject
  },
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export function Default({ subject }) {
  return (
    <Box width='large'>
      <WorkflowIsFinishedBanner subject={subject} />
      <img src='https://static.zooniverse.org/fem-assets/subject-placeholder.jpg' alt='placeholder' />
    </Box>
  )
}
