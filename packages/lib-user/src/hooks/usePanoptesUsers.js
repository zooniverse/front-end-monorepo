import { panoptes } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchPanoptesUsers(query) {
  let usersAccumulator = []

  async function getUsers(page = 1) {
    const response = await panoptes.get('/users', { page, ...query })
    const { meta, users } = response?.body || {}

    if (users && users.length) {
      usersAccumulator = usersAccumulator.concat(users)
    }

    if (meta?.users?.next_page) {
      return getUsers(meta.users.next_page)
    }

    return usersAccumulator
  }

  await getUsers(1)
  return usersAccumulator
}

export function usePanoptesUsers(query) {
  let key = null
  if (query && query.id) {
    key = query
  }
  return useSWR(key, fetchPanoptesUsers, SWROptions)
}
