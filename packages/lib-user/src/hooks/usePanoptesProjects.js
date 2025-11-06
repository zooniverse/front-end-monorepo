import { projects as panoptesProjects } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import usePanoptesAuthToken from './usePanoptesAuthToken'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchProjects({ query, token }) {
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
  const token = usePanoptesAuthToken()
  let key = null
  if (query?.id) {
    key = { query, token }
  }
  return useSWR(key, fetchProjects, SWROptions)
}
