import { Box } from 'grommet'

import TalkComment from '../TalkComment'

export default {
  title: 'Project App / Screens / Subject Talk / Talk Data / TalkComment',
  component: TalkComment,
  decorators: [(Story) => (
    <Box
      align='center'
      justify='center'
      background={{ dark: 'dark-3', light: 'white' }}
      pad='small'
    >
      <Box
        width={{ max: '600px' }}
      >
        <Story />
      </Box>
    </Box>
  )]
}

export const Default = {
  args: {
    avatar: 'https://panoptes-uploads-staging.zooniverse.org/user_avatar/0c51ab10-8c23-47fc-9452-c11852c754a9.jpeg',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    commentLink: 'https://www.zooniverse.org/projects/researcher/project-name/talk/123/456?comment=789',
    date: '2025-07-04T20:00:00Z',
    displayName: 'ZooTester 1',
    login: 'zootester1',
    projectSlug: 'researcher/project-name',
    upvotes: 0
  }
}

export const WithoutAvatar = {
  args: {
    body: 'This is a test comment without an avatar.',
    commentLink: 'https://www.zooniverse.org/projects/researcher/project-name/talk/123/456?comment=789',
    date: '2025-07-04T20:00:00Z',
    displayName: 'ZooTester 2',
    login: 'zootester2',
    projectSlug: 'researcher/project-name',
    upvotes: 2
  }
}

export const UserUpvoted = {
  args: {
    avatar: 'https://panoptes-uploads.zooniverse.org/user_avatar/57ce57cc-63cf-46e1-bc9f-a7e52c3f4c05.jpeg',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    commentLink: 'https://www.zooniverse.org/projects/researcher/project-name/talk/123/456?comment=789',
    date: '2025-07-04T20:00:00Z',
    displayName: 'ZooTester 3',
    login: 'zootester3',
    projectSlug: 'researcher/project-name',
    upvoted: true,
    upvotes: 7
  }
}

export const WithRoles = {
  args: {
    avatar: 'https://panoptes-uploads.zooniverse.org/user_avatar/57ce57cc-63cf-46e1-bc9f-a7e52c3f4c05.jpeg',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    commentLink: 'https://www.zooniverse.org/projects/researcher/project-name/talk/123/456?comment=789',
    date: '2025-07-04T20:00:00Z',
    displayName: 'ZooTester 4',
    login: 'zootester4',
    projectSlug: 'researcher/project-name',
    upvoted: false,
    upvotes: 3,
    roles: [
      { name: 'owner' },
      { name: 'translator' },
      { name: 'admin', section: 'zooniverse' }
    ]
  }
}
