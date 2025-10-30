import { Box } from 'grommet'

import Mentions from './Mentions'

const mentionsMock = [
  {
    href: '/mentions/181',
    links: {
      comment: '2054'
    },
    board_id: '274',
    comment: {
      id: '2054',
      body: 'This is a test comment for the Mentions component.',
      created_at: '2025-07-04T20:00:00Z',
      project_slug: 'researcher/project',
      user_display_name: 'ZooTester 1',
      user_login: 'zootester1'
    },
    comment_id: '2054',
    created_at: '2025-08-28T20:00:00Z',
    id: '181',
    mentionable_id: '252638',
    mentionable_type: 'Subject',
    project_id: '2022',
    section: 'project-2022',
    updated_at: '2025-08-28T20:00:00Z',
    user_id: '1001'
  },
  {
    href: '/mentions/179',
    links: {
      comment: '2025'
    },
    board_id: '273',
    comment_id: '2025',
    comment: {
      id: '2025',
      body: 'Another test comment for the Mentions component.',
      created_at: '2025-07-25T20:00:00Z',
      project_slug: 'researcher/project',
      user_display_name: 'ZooTester 2',
      user_login: 'zootester2'
    },
    created_at: '2025-07-25T20:00:00Z',
    id: '179',
    mentionable_id: '252638',
    mentionable_type: 'Subject',
    project_id: '2022',
    section: 'project-2022',
    updated_at: '2025-07-25T20:00:00Z',
    user_id: '1002'
  }
]

const usersMock = [
  {
    id: '1001',
    login: 'zootester1',
    display_name: 'ZooTester 1',
    avatar_src: 'https://panoptes-uploads-staging.zooniverse.org/user_avatar/0c51ab10-8c23-47fc-9452-c11852c754a9.jpeg'
  },
  {
    id: '1002',
    login: 'zootester2',
    display_name: 'ZooTester 2',
    avatar_src: null
  }
]

export default {
  title: 'Project App / Screens / Subject Talk / Talk Data / Mentions',
  component: Mentions,
  decorators: [(Story) => (
    <Box
      background={{ dark: 'dark-3', light: 'neutral-6' }}
      width='600px'
    >
      <Story />
    </Box>
  )]
}

export const Default ={
  args: {
    mentions: mentionsMock,
    users: usersMock,
  }
}
