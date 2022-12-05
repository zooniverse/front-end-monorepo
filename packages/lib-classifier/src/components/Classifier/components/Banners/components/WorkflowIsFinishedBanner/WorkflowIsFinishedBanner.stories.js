import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
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
        <WorkflowIsFinishedBanner
          subject={subject}
        />
        <img src="https://placekitten.com/800/400" alt='placeholder' />
      </Box>
    </Grommet>
  )
}
