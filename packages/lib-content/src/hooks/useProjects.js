import useSWR from 'swr'
import { projects as panoptesProjects } from '@zooniverse/panoptes-js'

/**
  A signed-in admin is not required by panoptes to fetch projects where launch_approved=false or undefined,
  but check if adminMode is turned on in localStorage, and if yes then return ALL projects regardless of launch approval.
*/
function checkForAdminFlag() {
  if (typeof localStorage !== 'undefined' && localStorage !== null) {
    return !!localStorage.getItem('adminFlag') || undefined
  }

  return undefined
}

async function fetchProjects(key) {
  const query = key[1]
  const adminMode = key[2]

  try {
    const response = await panoptesProjects.get({
      query: {
        cards: true,
        page_size: 20,
        launch_approved: !!adminMode ? false : true,
        ...query
      }
    })

    if (response.ok) {
      const { meta, projects } = response?.body || {}

      const numProjects = meta.projects.count
      return { numProjects, projects }
    }

    return null
  } catch (error) {
    console.error(error)
    return null
  }
}

export function useProjects(query) {
  // include adminMode in the cache key so cached response respects launch_approved query param
  const adminMode = checkForAdminFlag()
  // This key matches the key provided in ProjectsContainer for fallback data passed from SSR
  const key = [ '/projects', query, adminMode ]

  return useSWR(key, fetchProjects, {
    revalidateIfStale: true,
    revalidateOnMount: false, // this hook receives fallback data
    refreshInterval: 0,
    revalidateOnFocus: false,
  })
}

export default useProjects
