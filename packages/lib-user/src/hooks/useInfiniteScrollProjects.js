import { projects as panoptesProjects } from '@zooniverse/panoptes-js'
import useSWRInfinite from 'swr/infinite'

import usePanoptesAuthToken from './usePanoptesAuthToken.js'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  refreshInterval: 0,
  // additional options for useSWRInfinite
  initialSize: 1,
  revalidateAll: false,
  revalidateFirstPage: true,
  persistSize: false,
  parallel: false
}

/* Similar to usePanoptesProjects but page is set by infinite scroll UI */
async function fetchProjects({ pageIndex, query, token }) {
  const authorization = token ? `Bearer ${token}` : undefined

  try {
    const response = await panoptesProjects.get({
      query: {
        page: pageIndex + 1, // SWR's initial pageIndex is 0, but panoptes's first page is 1
        ...query
      },
      authorization // Although project data doesn't usually require a signed-in user,
                    // authorization allows for fetching projects that aren't "Live"
    })

    const { projects } = response?.body || {}

    if (projects && projects.length) {
      return projects
    }

    return []
  } catch (error) {
    console.log
    console.error(error)
    return []
  }
}

// use SWRInfinite by passing all projectIDs and let it handle the pagination
// `data` will look like this, max 20 projects at a time
// [
//   [
//     { display_name: "i-fancy-cats", id: "335", ... },
//     { display_name: "Gravity Spy", id: "1104", ... },
//     ...
//   ],
//   [
//     { display_name: "Snapshot Serengeti", id: "4996", ... },
//     { display_name: "Elephant ID", id: "21521", ... },
//     ...
//   ],
// ]

export function useInfiniteScrollProjects(projectContributions, query) {
  const token = usePanoptesAuthToken()

  const getKey = (pageIndex, previousPageData) => {
    let key = null
    if (previousPageData && !previousPageData.length) return null // reached the end
    if (query?.id) {
      key = { pageIndex, query, token }
    }
    return key
  }

  const { data: projects, error, isLoading, isValidating, size, setSize } = useSWRInfinite(getKey, fetchProjects, SWROptions)

    // Match project data from panoptes to the stat from ERAS
    const renderedProjects = projectContributions
    ?.map(projectContribution => {
      const projectData = projects?.flat().find(
        project => project.id === projectContribution.project_id.toString()
      )
      return {
        count: projectContribution.count, // for the badge in ProjectCard
        ...projectData
      }
    })
    .filter(project => project?.id) // in case a project is not returned from panoptes

    return { renderedProjects, error, isLoading, isValidating, size, setSize }
}
