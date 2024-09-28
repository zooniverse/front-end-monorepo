import { projects as panoptesProjects } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'
import useSWR from 'swr'

const isBrowser = typeof window !== 'undefined'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

if (isBrowser) {
  auth.checkCurrent()
}

async function fetchProjects(query) {
  await auth.checkCurrent()
  const token = await auth.checkBearerToken()
  const authorization = token ? `Bearer ${token}` : undefined

  let projectsAccumulator = []
  
  async function getProjects (page = 1) {
    try {
      const response = await panoptesProjects.get({
        query: {
          page,
          ...query
        },
        authorization
      })

      const { meta, projects } = response?.body || {}
  
      if (meta?.projects?.page_count > 5) {
        console.warn('There are more than 500 projects related to this request. This is likely an error.')
        return []
      }
      
      if (projects && projects.length) {
        projectsAccumulator = projectsAccumulator.concat(projects)
      }
  
      if (meta?.projects?.next_page) {
        return getProjects(meta.projects.next_page)
      }
  
      return projectsAccumulator
    } catch (error) {
      console.error(error)
      return projectsAccumulator
    }
  }

  await getProjects(1)
  return projectsAccumulator
}

export function usePanoptesProjects(query) {
  let key = null
  if (query?.id) {
    key = query
  }
  return useSWR(key, fetchProjects, SWROptions)
}
