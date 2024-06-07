import { panoptes } from '@zooniverse/panoptes-js'
import useSWR from 'swr'

import Dashboard from './Dashboard'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

/* This is a similar pattern to usePanoptesUser hook, but includes the profile_header */
const fetchProfileBanner = async ({ authUser}) => {
  try {
    const { body } = await panoptes.get(`/users/${authUser.id}/?include=profile_header`)
    const user = body.users?.[0]

    if (body.linked?.profile_headers?.length) {
      user.profile_header = body.linked.profile_headers[0].src
    }
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

export default function DashboardContainer({ authUser }) {
  const key = { endpoint: '/users/[id]', authUser }
  const { data: user, isLoading } = useSWR(key, fetchProfileBanner, SWROptions)

  return <Dashboard user={user} isLoading={isLoading} />
}
