import { Box } from 'grommet'

import StartDiscussionModal from './StartDiscussionModal'

const boards = [
  { id: '1', title: 'Notes', subject_default: true, subject_default_discussion_title: 'Subject 789' },
  { id: '2', title: 'Technical Support', subject_default: false },
  { id: '3', title: 'Research Team', subject_default: false },
  { id: '4', title: 'Team Private Board', subject_default: false }
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
    onClose: () => console.log('closing modal')
  }
}

export const WithCommentMessage = {
  args: {
    active: true,
    boards,
    onClose: () => console.log('closing modal'),
    showCommentMessage: true
  }
}
