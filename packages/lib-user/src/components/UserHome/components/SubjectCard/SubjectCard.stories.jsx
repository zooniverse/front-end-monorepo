import { Box } from 'grommet'
import SubjectCard from './SubjectCard'

export default {
  title: 'Components / UserHome / SubjectCard',
  component: SubjectCard
}

// .jpeg or .png
export const Default = {
  args: {
    subjectID: '123',
    mediaSrc: 'https://panoptes-uploads-staging.zooniverse.org/subject_location/34d154ca-1d8a-4c8a-ae29-96f58e0700f4.jpeg',
    projectSlug: 'brooke/i-fancy-cats'
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

// .mp4
export const Video = {
  args: {
    subjectID: '456',
    mediaSrc: 'https://panoptes-uploads.zooniverse.org/subject_location/7da396d3-04f6-44b9-aef5-db4cac5dc172.mp4',
    projectSlug: 'sophiemu/solar-jet-hunter'
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

// .txt
export const Text = {
  args: {
    subjectID: '789',
    mediaSrc: 'https://panoptes-uploads.zooniverse.org/subject_location/f5506d1c-a0e9-4aba-a418-6a6c46a7731a.txt',
    projectSlug: 'markb-panoptes/digileap-testing-staging'
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

// .json
export const Data = {
  args: {
    subjectID: '8364',
    mediaSrc: 'https://panoptes-uploads.zooniverse.org/subject_location/bdc78b71-ce68-4e10-9ae7-0e643e215143.json',
    projectSlug: 'cobalt-lensing/black-hole-hunters'
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
