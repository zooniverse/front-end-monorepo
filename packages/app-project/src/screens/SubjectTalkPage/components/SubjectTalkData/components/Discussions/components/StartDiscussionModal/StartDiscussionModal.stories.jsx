import { Box } from 'grommet'

import StartDiscussionModal from './StartDiscussionModal'

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
    onClose: () => console.log('closing modal')
  }
}

export const WithCommentMessage = {
  args: {
    active: true,
    onClose: () => console.log('closing modal'),
    showCommentMessage: true
  }
}
