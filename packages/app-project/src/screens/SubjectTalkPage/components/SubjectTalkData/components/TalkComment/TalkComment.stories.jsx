import { Box } from 'grommet'

import TalkComment from '../TalkComment'

const commentMock = {
  id: '123',
  body: 'This is a test comment for the TalkComment component.',
  created_at: '2025-07-04T20:00:00Z',
  project_slug: 'researcher/project',
  user_display_name: 'ZooTester 1',
  user_login: 'zootester1'
}

const commentWithUpvotesMock = {
  ...commentMock,
  upvotes: {
    zootester2: '1122',
    zootester3: '3344',
    zootester4: '5566'
  }
}

const commentWithLongBodyMock = {
  ...commentWithUpvotesMock,
  body: `This is a test comment with a longer body to see how the component handles larger amounts of text.

  It even has multiple paragraphs to really test things out.

  - It has a list
  - With several items
  - To see how that looks

  And a [link](https://www.zooniverse.org) too!`
}

const commentReplyMock = {
  ...commentMock,
  body: 'This is a reply to a comment.',
  reply_id: '987',
  reply_user_display_name: 'ZooTester 2',
  reply_user_id: '456',
  reply_user_login: 'zootester2'
}

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
    comment: commentMock
  }
}

export const WithoutAvatar = {
  args: {
    comment: commentWithLongBodyMock
  }
}

export const UserUpvoted = {
  args: {
    avatar: 'https://panoptes-uploads.zooniverse.org/user_avatar/57ce57cc-63cf-46e1-bc9f-a7e52c3f4c05.jpeg',
    comment: commentWithUpvotesMock,
    login: 'zootester3'
  }
}

export const WithRoles = {
  args: {
    avatar: 'https://panoptes-uploads.zooniverse.org/user_avatar/57ce57cc-63cf-46e1-bc9f-a7e52c3f4c05.jpeg',
    comment: commentMock,
    roles: [
      { id: 1, name: 'admin', section: 'zooniverse', user_id: 123 },
      { id: 2, name: 'scientist', section: 'project', user_id: 123 }
    ]
  }
}

export const Reply = {
  args: {
    avatar: 'https://panoptes-uploads.zooniverse.org/user_avatar/57ce57cc-63cf-46e1-bc9f-a7e52c3f4c05.jpeg',
    comment: commentReplyMock
  }
}
