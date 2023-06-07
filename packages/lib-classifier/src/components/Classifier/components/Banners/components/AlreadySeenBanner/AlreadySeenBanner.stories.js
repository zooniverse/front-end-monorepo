import { Box } from 'grommet'
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
    subject
  },
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  },
  tags: ['autodoc']
}

export function Default({ subject }) {
  return (
    <Box width='large'>
      <AlreadySeenBanner subject={subject} />
      <img src='https://placekitten.com/800/400' alt='placeholder' />
    </Box>
  )
}
