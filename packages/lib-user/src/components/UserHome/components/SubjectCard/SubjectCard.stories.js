import { Box } from 'grommet'
import SubjectCard from './SubjectCard'
import mockSubjects from '../RecentSubjects/subjects.mock.json'

export default {
  title: 'Components / UserHome / SubjectCard',
  component: SubjectCard
}

export const Default = {
  args: {
    subject: mockSubjects[0]
  },
  render: args => (
    <Box gap='medium' pad='medium' direction='row'>
      <SubjectCard size='xlarge' {...args} />
      <SubjectCard size='large' {...args} />
      <SubjectCard size='medium' {...args} />
      <SubjectCard size='small' {...args} />
    </Box>
  )
}
