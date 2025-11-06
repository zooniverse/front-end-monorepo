import { Box } from 'grommet'

import Role from './Role'

export default {
  title: 'Project App / Screens / Subject Talk / Talk Data / TalkComment / Role',
  component: Role,
  decorators: [(Story) => (
    <Box
      background={{ dark: 'dark-3', light: 'white' }}
      pad='medium'
    >
      <Story />
    </Box>
  )]
}

export const Default = {
  args: {
    role: {
      id: '1',
      name: 'scientist',
      section: 'project',
      user_id: '123'
    }
  }
}

export const ZooniverseAdmin = {
  args: {
    role: {
      id: '2',
      name: 'admin',
      section: 'zooniverse',
      user_id: '123'
    }
  }
}

export const Translator = {
  args: {
    role: {
      id: '3',
      name: 'translator',
      section: 'project',
      user_id: '123'
    }
  }
}
