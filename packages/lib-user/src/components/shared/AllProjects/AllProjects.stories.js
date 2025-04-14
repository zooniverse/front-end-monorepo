import { http, HttpResponse } from 'msw'

import { PROJECTS, PROJECT_CONTRIBUTIONS } from './AllProjects.mocks.js'
import AllProjects from './AllProjects.js'

// panoptes-staging when Storybook is run locally, or production when Storybook is deployed
const PANOPTES_HOST =
  process.env.NODE_ENV === 'production'
    ? 'https://www.zooniverse.org'
    : 'https://panoptes-staging.zooniverse.org'

export default {
  title: 'Components/shared/AllProjects',
  component: AllProjects,
  parameters: {
    // See the mocked req and res in the browser console
    msw: {
      handlers: [
        // usePanoptesAuthToken() is in useInfiniteScrollProjects() and it makes a POST to oauth.
        // This response replicates when a there's no signed-in user. For instance, public groups still show AllProjects.
        // https://mswjs.io/docs/basics/mocking-responses/#mocking-error-responses
        http.post(`${PANOPTES_HOST}/oauth/token`, () => {
          return new HttpResponse(null, { status: 401 })
        }),
        // useSWRInfinite handles the page searchParam, increasing it on every click of Load More.
        // PROJECTS mock contains 22 projects
        http.get(`${PANOPTES_HOST}/api/projects`, ({ request }) => {
          const url = new URL(request.url)
          const page = url.searchParams.get('page')

          return page === '1'
            ? HttpResponse.json({
                projects: PROJECTS.slice(0, 20)
              })
            : HttpResponse.json({
                projects: PROJECTS.slice(20)
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

// This would occur if there was an error from the containing page which fetches stats and/or more info about users
export const Error = {
  args: {
    containerError: { message: `Couldn't fetch projects`, status: 500 },
    containerLoading: false,
    projectContributions: PROJECT_CONTRIBUTIONS
  }
}

// projectContributions is empty if the user or group has zero stats
export const NoProjects = {
  args: {
    containerError: null,
    containerLoading: false,
    projectContributions: []
  }
}
