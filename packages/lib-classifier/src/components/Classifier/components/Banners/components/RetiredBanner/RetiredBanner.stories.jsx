import { Box } from 'grommet'
import RetiredBanner from './RetiredBanner'
import readme from '../../README.md'
import { SubjectFactory } from '@test/factories'

const subject = SubjectFactory.build({
  retired: true
})

export default {
  title: 'Banners / RetiredBanner',
  component: RetiredBanner,
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
      <RetiredBanner subject={subject} />
      <img src='https://static.zooniverse.org/fem-assets/subject-placeholder.jpg' alt='placeholder' />
    </Box>
  )
}
