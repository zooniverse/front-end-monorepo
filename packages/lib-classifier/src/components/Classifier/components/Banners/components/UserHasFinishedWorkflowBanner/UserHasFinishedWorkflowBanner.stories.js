import { Box } from 'grommet'
import UserHasFinishedWorkflowBanner from './UserHasFinishedWorkflowBanner'
import readme from '../../README.md'
import { SubjectFactory } from '@test/factories'

const subject = SubjectFactory.build({
  user_has_finished_workflow: true
})

export default {
  title: 'Banners / UserHasFinishedWorkflowBanner',
  component: UserHasFinishedWorkflowBanner,
  args: {
    subject
  },
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  },
  tags: ['autodocs']
}

export function Default({ subject }) {
  return (
    <Box width='large'>
      <UserHasFinishedWorkflowBanner subject={subject} />
      <img src='https://placekitten.com/800/400' alt='placeholder' />
    </Box>
  )
}
