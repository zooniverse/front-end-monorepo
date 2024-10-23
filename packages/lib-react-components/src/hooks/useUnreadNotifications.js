import { talkAPI } from '@zooniverse/panoptes-js'
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

async function fetchUnreadNotificationsCount({ endpoint = '/notifications' }) {
  await auth.checkCurrent()
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  if (!token) return 0

  const query = {
    delivered: false,
    page_size: 1
  }

  const response = await talkAPI.get(endpoint, query, { authorization })
  return response?.body?.meta?.notifications?.count
}

export default function useUnreadNotifications(user) {
  let key = null
  if (user?.login) {
    key = {
      user,
      endpoint: '/notifications'
    }
  }
  return useSWR(key, fetchUnreadNotificationsCount, SWROptions)
}
