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
  title: 'Project App / Screens / Subject Talk / Talk Data / StartDiscussionModal',
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
    onSubmit: (data) => { console.log('submitted data', data)},
    subjectId: '12345'
  }
}

export const WithManyBoards = {
  args: {
    active: true,
    boards: [
      ...boards,
      {
        id: '5',
        subject_default: false,
        title: 'Team + Zooniverse Private Board'
      },
      {
        id: '6',
        subject_default: false,
        title: 'Announcements and Project Updates'
      },
      {
        id: '7',
        subject_default: false,
        title: 'Science Questions & Conversations'
      },
      {
        id: '8',
        subject_default: false,
        title: 'Getting Started, Training Examples, and Scientific Information'
      }
    ],
    onClose: () => console.log('closing modal'),
    onSubmit: (data) => { console.log('submitted data', data)},
    subjectId: '12345'
  }
}

export const WithCommentMessage = {
  args: {
    active: true,
    boards,
    onClose: () => console.log('closing modal'),
    onSubmit: (data) => { console.log('submitted data', data)},
    showCommentMessage: true,
    subjectId: '12345'
  }
}

export const Loading = {
  args: {
    active: true,
    boards,
    loading: true,
    onClose: () => console.log('closing modal'),
    onSubmit: (data) => { console.log('submitted data', data)},
    subjectId: '12345'
  }
}

export const Error = {
  args: {
    active: true,
    boards,
    error: {
      message: 'Detailed error message.'
    },
    onClose: () => console.log('closing modal'),
    onSubmit: (data) => { console.log('submitted data', data)},
    subjectId: '12345'
  }
}
