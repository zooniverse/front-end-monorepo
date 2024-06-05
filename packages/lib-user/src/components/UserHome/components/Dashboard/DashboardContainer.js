import { panoptes } from '@zooniverse/panoptes-js'
import auth from 'panoptes-client/lib/auth'
import useSWR from 'swr'

import Dashboard from './Dashboard'

const fetchProfileBanner = async ({ authUser }) => {
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  const query = { include: 'profile_header', user_id: authUser.id }

  try {
    const { body } = await panoptes.get('/users', query, { authorization })
    const profileBannerSrc = body.linked.profile_headers[0].src
    return profileBannerSrc
  } catch (error) {
    console.error(error)
    return null
  }
}

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

export default function DashboardContainer({ authUser }) {
  const key = { authUser }
  const { data: profileBannerSrc } = useSWR(key, fetchProfileBanner, SWROptions)

  return <Dashboard authUser={authUser} profileBannerSrc={profileBannerSrc} />
}
