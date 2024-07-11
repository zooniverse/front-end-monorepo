import { panoptes } from '@zooniverse/panoptes-js'
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

async function fetchMemberships({ query }) {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  if (!token) return null

  async function getMemberships(
    page = 1, 
    accumulatedData = {
      memberships: [],
      linked: { user_groups: [], users: [] }
    }
  ) {
    try {
      const response = await panoptes.get('/memberships', { page, ...query }, { authorization })
      const { body } = response

      const newData = {
        memberships: [...accumulatedData.memberships, ...body.memberships],
        linked: {
          user_groups: [...accumulatedData.linked.user_groups, ...(body.linked?.user_groups || [])],
          users: [...accumulatedData.linked.users, ...(body.linked?.users || [])],
        },
      }

      if (body.meta?.memberships?.next_page) {
        return getMemberships(page + 1, newData)
      }

      return newData
    } catch (error) {
      console.error(error)
      return null
    }
  }

  return getMemberships()
}

export function usePanoptesMemberships({ authUserId, query }) {
  const key = (query.user_id || query.user_group_id) && authUserId ? { query } : null
  return useSWR(key, fetchMemberships, SWROptions)
}
