import useSWR from 'swr'
import { shape, string } from 'prop-types'

import fetchRecentSubjects from './fetchRecentSubjects.js'
import RecentSubjects from './RecentSubjects.js'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

function RecentSubjectsContainer({ authUser }) {
  const cacheKey = {
    name: 'user-recent-classifications',
    userId: authUser.id
  }
  const {
    data: recents,
    error: recentsError,
    isLoading
  } = useSWR(cacheKey, fetchRecentSubjects, SWROptions)

  return (
    <RecentSubjects isLoading={isLoading} recents={recents} recentsError={recentsError} />
  )
}

export default RecentSubjectsContainer

RecentSubjectsContainer.propTypes = {
  authUser: shape({
    id: string
  })
}
