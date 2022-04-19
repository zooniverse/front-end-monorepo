import useSWR from 'swr'

import { useStores } from '@hooks'

const SWRoptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

export default function usePanoptesUser() {
  const { authClient } = useStores()
  const { data } = useSWR('/me', authClient.checkCurrent, SWRoptions)
  return data
}
