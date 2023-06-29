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
    const user = await auth.checkCurrent()
    console.log({ user })
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}

export default function usePanoptesUser(key) {
  const { data } = useSWR(key, fetchPanoptesUser, SWRoptions)
  console.log({ data })
  return data
}
