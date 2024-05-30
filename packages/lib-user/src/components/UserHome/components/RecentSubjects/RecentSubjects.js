import { Box } from 'grommet'
import useSWR from 'swr'
import { Loader } from '@zooniverse/react-components'

import fetchRecentSubjects from './fetchRecentSubjects.js'
import SubjectCard from '../SubjectCard/SubjectCard.js'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

function RecentSubjects({ authUser }) {
  const cacheKey = {
    name: 'user-recent-classifications',
    userId: authUser.id
  }
  const {
    data: subjects,
    error,
    isLoading
  } = useSWR(cacheKey, fetchRecentSubjects, SWROptions)

  return (
    <Box direction='row' fill height={{ min: '300px' }}>
      {isLoading && <Loader />}
      {!isLoading && subjects?.length
        ? subjects.map(subject => <SubjectCard subject={subject} />)
        : null}
    </Box>
  )
}

export default RecentSubjects
