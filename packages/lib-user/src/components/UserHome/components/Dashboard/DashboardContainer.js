import { panoptes } from '@zooniverse/panoptes-js'
import useSWR from 'swr'
import { shape, string } from 'prop-types'

import Dashboard from './Dashboard'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

const fetchProfileBanner = async ({ authUser }) => {
  try {
    const { body } = await panoptes.get(
      `/users/${authUser.id}/?include=profile_header`
    )
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
  const { data: user, isLoading: userLoading } = useSWR(key, fetchProfileBanner, SWROptions)

  return (
    <Dashboard
      user={user}
      userLoading={userLoading}
    />
  )
}

DashboardContainer.propTypes = {
  authUser: shape({
    id: string.isRequired,
  })
}
