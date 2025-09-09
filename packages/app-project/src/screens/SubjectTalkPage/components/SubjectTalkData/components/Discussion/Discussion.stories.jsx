import { Box } from 'grommet'
import { http, HttpResponse } from 'msw'

import Discussion from '../Discussion'

function DecoratedStory(Story) {
  return (
    <Box
      as='ol'
      background={{ dark: 'dark-3', light: 'neutral-6' }}
      border='between'
      gap='60px'
      pad='20px'
      width='600px'
      style={{ listStyle: 'none', margin: 0 }}
    >
      <li>
        <Story />
      </li>
    </Box>
  )
}

const PANOPTES_HOST = process.env.NODE_ENV === 'production'
  ? 'https://www.zooniverse.org'
  : 'https://panoptes-staging.zooniverse.org'

const TALK_HOST = process.env.NODE_ENV === 'production'
  ? 'https://talk.zooniverse.org'
  : 'https://talk-staging.zooniverse.org'

const commentsNewestFirst = [
  {
    id: '2',
    body: 'This is test comment.',
    created_at: '2025-07-05T20:00:00Z',
    user_display_name: 'ZooTester 2',
    user_id: '1002',
    user_login: 'zootester2',
    upvotes: {}
  },
  {
    id: '1',
    body: 'Woof woof bark. Woof woof bark. Woof woof bark.',
    created_at: '2025-07-04T20:00:00Z',
    user_display_name: 'ZooTester 1',
    user_id: '1001',
    user_login: 'zootester1',
    upvotes: {
      zootester2: '123456789'
    }
  },
  {
    id: '3',
    body: 'This is another test comment.',
    created_at: '2025-07-03T20:00:00Z',
    user_display_name: 'ZooTester 2',
    user_id: '1002',
    user_login: 'zootester2',
    upvotes: {
      zootester3: '987654321',
      zootester4: '123123123'
    }
  }
]

const commentsOldestFirst = commentsNewestFirst.slice().reverse()

export default {
  title: 'Project App / Screens / Subject Talk / Talk Data / Discussion',
  component: Discussion,
  decorators: [DecoratedStory],
  parameters: {
    msw: {
      handlers: [
        http.get(`${TALK_HOST}/comments`, ({ request }) => {
          if (request.url.includes('sort=-created_at')) {
            return HttpResponse.json({
              comments: commentsNewestFirst
            })
          } else {
            return HttpResponse.json({
              comments: commentsOldestFirst
            })
          }
        }),
        http.get(`${PANOPTES_HOST}/api/users`, ({ request }) => {
          return HttpResponse.json({
            users: [
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
          })
        })
      ]
    }
  }
}

export function Default(args) {
  const { ...props } = args
  return <Discussion {...props} />
}

Default.args = {
  discussion: {
    id: '456',
    board_id: '123',
    board_title: 'Test Board',
    comments_count: 3,
    project_slug: 'researcher/project-name',
    title: 'Test Discussion',
    users_count: 2
  },
  login: 'zootester2'
}
