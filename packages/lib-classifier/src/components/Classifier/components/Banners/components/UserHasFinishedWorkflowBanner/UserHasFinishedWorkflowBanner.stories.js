import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
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
    dark: false,
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

export function Default({ dark, subject }) {
  const theme = { ...zooTheme, dark }
  return (
    <Grommet theme={theme}>
      <Box background={{ dark: 'dark-3', light: 'light-3' }} width='large'>
        <UserHasFinishedWorkflowBanner
          subject={subject}
        />
        <img src="https://placekitten.com/800/400" alt='placeholder' />
      </Box>
    </Grommet>
  )
}
