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

async function decodeJWT(token) {
  let user = null
  let error = null
  const decodedToken = await panoptesJS.auth.verify(token)
  const { data } = decodedToken
  error = decodedToken.error
  if (data) {
    user = {
      id: data.id.toString(),
      login: data.login,
      display_name: data.dname,
      admin: data.admin
    }
  }
  return { user, error }
}

async function fetchPanoptesUser() {
  try {
    const token = await auth.checkBearerToken()
    if (token) {
      const { user, error } = await decodeJWT(token)
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
