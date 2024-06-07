import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'
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
const fetchProfileBanner = async ({ authUser }) => {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  const query = { include: 'profile_header', user_id: authUser.id }

  try {
    const { body } = await panoptes.get('/users', query, { authorization })
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
  const key = { authUser }
  const { data: user, isLoading } = useSWR(key, fetchProfileBanner, SWROptions)

  return <Dashboard user={user} isLoading={isLoading} />
}
