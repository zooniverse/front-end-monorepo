import { Box } from 'grommet'

import StartDiscussionModal from './StartDiscussionModal'

const boards = [
  {
    id: '1',
    subject_default: true,
    title: 'Notes'
  },
  {
    id: '2',
    subject_default: false,
    title: 'Technical Support'
  },
  {
    id: '3',
    subject_default: false,
    title: 'Research Team'
  },
  {
    id: '4',
    subject_default: false,
    title: 'Team Private Board'
  }
]

export default {
  title: 'Project App / Screens / Subject Talk / Talk Data / Discussions / StartDiscussionModal',
  component: StartDiscussionModal,
  decorators: [(Story) => (
    <Box
      pad='large'
    >
      <Story />
    </Box>
  )]
}

export const Default = {
  args: {
    active: true,
    boards,
    onClose: () => console.log('closing modal'),
    onSubmit: (data) => { console.log('submitted data', data)}
  }
}

export const WithCommentMessage = {
  args: {
    active: true,
    boards,
    onClose: () => console.log('closing modal'),
    onSubmit: (data) => { console.log('submitted data', data)},
    showCommentMessage: true
  }
}
