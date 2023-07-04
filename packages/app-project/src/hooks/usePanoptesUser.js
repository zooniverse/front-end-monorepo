import * as panoptesJS from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'
import useSWR from 'swr'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchPanoptesUser() {
  try {
    const token = await auth.checkBearerToken()
    if (token) {
      const { user, error } = await panoptesJS.auth.decodeJWT(token)
      if (user) {
        return user
      }
      if (error) {
        throw error
      }
    }
    return await auth.checkCurrent()
  } catch (error) {
    console.log(error)
    return null
  }
}

export default function usePanoptesUser(key = 'no-user') {
  const { data } = useSWR(key, fetchPanoptesUser, SWRoptions)
  return data
}
