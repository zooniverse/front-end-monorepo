import { Box } from 'grommet'

import ParticipantsAndComments from './ParticipantsAndComments'

export default {
  title: 'Project App / Screens / Subject Talk / Talk Data / Participants and Comments',
  component: ParticipantsAndComments,
  decorators: [(Story) => (
    <Box
      align='center'
      justify='center'
      background={{ dark: 'dark-3', light: 'white' }}
      pad='small'
    >
      <Story />
    </Box>
  )]
}

export const Default = {
  args: {
    commentsCount: 10,
    usersCount: 5
  }
}

export const NoComments = {
  args: {
    commentsCount: 0,
    usersCount: 0
  }
}
