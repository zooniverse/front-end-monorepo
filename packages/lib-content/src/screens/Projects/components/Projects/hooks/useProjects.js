import useSWR from 'swr'
import { projects as panoptesProjects } from '@zooniverse/panoptes-js'

async function fetchProjects(key) {
  const query = key[1]

  try {
    const response = await panoptesProjects.get({
      query: {
        cards: true,
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
  const key = [ '/projects', query ]

  return useSWR(key, fetchProjects, {
    revalidateIfStale: true,
    revalidateOnMount: false, // this hook receives fallback data from SSR
    refreshInterval: 0,
    revalidateOnFocus: false,
  })
}

export default useProjects
