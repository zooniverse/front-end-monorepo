import { projects as panoptesProjects } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchProjects(id) {
  let projectsAccumulator = []
  
  async function getProjects (page = 1) {
    const query = {
      cards: true,
      id,
      page,
      page_size: 100
    }
    const response = await panoptesProjects.get({ query })
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
  }

  await getProjects(1)
  return projectsAccumulator
}

export function usePanoptesProjects(projectIds) {
  let key = null
  if (projectIds) {
    const id = projectIds.join(',')
    key = id
  }
  return useSWR(key, fetchProjects, SWRoptions)
}
