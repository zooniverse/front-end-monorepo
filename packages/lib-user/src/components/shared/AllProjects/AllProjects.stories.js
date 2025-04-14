import { http, HttpResponse } from 'msw'

import { PROJECTS, PROJECT_CONTRIBUTIONS } from './AllProjects.mocks.js'
import AllProjects from './AllProjects.js'

const PANOPTES_HOST =
  process.env.NODE_ENV === 'production'
    ? 'https://www.zooniverse.org'
    : 'https://panoptes-staging.zooniverse.org'

export default {
  title: 'Components/shared/AllProjects',
  component: AllProjects,
  parameters: {
    msw: {
      handlers: [
        http.post(`${PANOPTES_HOST}/oauth/token`, () => {
          return HttpResponse.json({
            access_token: 'defg',
            token_type: 'Bearer',
            expires_in: 7200,
            refresh_token: 'abc',
            created_at: 1744597727
          })
        }),
        http.get(`${PANOPTES_HOST}/api/me`, ({ request }) => {
          if (request.headers.authorization === 'Bearer defg') {
            return HttpResponse.json({
              users: [{
                id: '1234',
                login: 'testuser',
                display_name: 'Test User',
              }]
            })
          }
          return HttpResponse.json({
            error: 'Unauthorized'
          }, { status: 401 })
        }),
        http.get(`${PANOPTES_HOST}/api/projects`, ({ request }) => {
          return HttpResponse.json({
            projects: PROJECTS
          })
        })
      ]
    }
  }
}

export const Default = {
  args: {
    containerError: null,
    containerLoading: false,
    projectContributions: PROJECT_CONTRIBUTIONS
  }
}

export const Error = {
  args: {
    containerError: { message: `Couldn't fetch projects`, status: 500 },
    containerLoading: false,
    projectContributions: PROJECT_CONTRIBUTIONS
  }
}
export const NoProjects = {
  args: {
    containerError: null,
    containerLoading: false,
    projectContributions: []
  }
}
