import { http, HttpResponse } from 'msw'

import { PROJECTS, PROJECT_CONTRIBUTIONS } from '../AllProjects.mocks.js'
import AllProjectsByCount, { PAGE_SIZE } from './AllProjectsByCount.js'

// panoptes-staging when Storybook is run locally, or production when Storybook is deployed
const PANOPTES_HOST =
  process.env.NODE_ENV === 'production'
    ? 'https://www.zooniverse.org'
    : 'https://panoptes-staging.zooniverse.org'

const projectIds = PROJECT_CONTRIBUTIONS?.map(project => project.project_id)

export default {
  title: 'Components/shared/AllProjects',
  component: AllProjectsByCount,
  parameters: {
    // See the mocked req and res in the browser console
    msw: {
      handlers: [
        // usePanoptesAuthToken() is in usePanoptesProjects() and it makes a POST to oauth.
        // This response replicates when a there's no signed-in user. For instance, public groups still show AllProjects.
        // https://mswjs.io/docs/basics/mocking-responses/#mocking-error-responses
        http.post(`${PANOPTES_HOST}/oauth/token`, () => {
          return new HttpResponse(null, { status: 401 })
        }),
        // The query to /projects is manually handled per page in AllProjects
        // We're intercepting /projects here, reading the query, and returning mock projects
        http.get(`${PANOPTES_HOST}/api/projects`, ({ request }) => {
          const searchParams = new URL(request.url).searchParams
          // // 1st page
          if (searchParams?.get('id') === projectIds.slice(0, PAGE_SIZE).join(',')) {
            return HttpResponse.json({
              projects: PROJECTS.slice(0, PAGE_SIZE)
            })
          // // 2nd page
          } else if (
            searchParams?.get('id') === projectIds.slice(PAGE_SIZE).join(',')
          ) {
            return HttpResponse.json({
              projects: PROJECTS.slice(PAGE_SIZE)
            })
          }
          return HttpResponse.json({ projects: []}) // default case so we don't make any /projects req to the real api
        })
      ]
    }
  }
}

// PROJECTS mock contains 51 projects
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
