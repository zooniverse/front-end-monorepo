import zooTheme from '@zooniverse/grommet-theme'
import { Box, Grommet } from 'grommet'
import AlreadySeenBanner from './AlreadySeenBanner'
import readme from '../../README.md'
import { SubjectFactory } from '@test/factories'

const subject = SubjectFactory.build({
  alreadySeen: true
})

export default {
  title: 'Banners / AlreadySeenBanner',
  component: AlreadySeenBanner,
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
        <AlreadySeenBanner
          subject={subject}
        />
        <img src="https://placekitten.com/800/400" alt='placeholder' />
      </Box>
    </Grommet>
  )
}
