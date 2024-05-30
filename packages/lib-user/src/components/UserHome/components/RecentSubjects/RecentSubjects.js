import { Anchor, Box, Text } from 'grommet'
import useSWR from 'swr'
import { Loader, SpacedHeading, SpacedText } from '@zooniverse/react-components'

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
    <Box
      pad='medium'
      height={{ min: '200px' }}
      round='small'
      border={{
        color: { light: 'light-5', dark: 'black' },
        size: 'xsmall'
      }}
    >
      <SpacedHeading size='1.125rem' level={2} margin={{ top: '0' }}>
        Recent Classifications
      </SpacedHeading>
      <Box
        as='ul'
        direction='row'
        gap='small'
        pad={{ horizontal: 'xxsmall', bottom: 'xsmall' }}
        overflow={{ horizontal: 'auto' }}
        style={{ listStyle: 'none' }}
        margin='0'
      >
        {isLoading && (
          <Box fill justify='center' align='center'>
            <Loader />
          </Box>
        )}
        {!isLoading && !subjects?.length && (
          <Box fill justify='center' align='center' pad='medium'>
            <SpacedText>No Recent Classifications found</SpacedText>
            <Text>
              Start by{' '}
              <Anchor href='https://www.zooniverse.org/projects'>
                classifying any project
              </Anchor>{' '}
              to show your recent classifications here.
            </Text>
          </Box>
        )}
        {!isLoading && subjects?.length
          ? subjects
              .slice(0, 10)
              .map(subject => <SubjectCard subject={subject} />)
          : null}
      </Box>
    </Box>
  )
}

export default RecentSubjects
