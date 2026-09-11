import { Loader } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'

import { useRecents } from '@hooks'

import EmptyPlaceholder from '../Placeholders/EmptyPlaceholder'
import ErrorPlaceholder from '../Placeholders/ErrorPlaceholder'
import SignedOutPlaceholder from '../Placeholders/SignedOutPlaceholder'
import RecentsHeading from '../RecentsHeading'
import RecentsList from '../RecentsList'

function useStores() {
  const stores = useContext(MobXProviderContext)
  const { project, user } = stores.store
  return {
    login: user?.login,
    projectId: project?.id,
    projectSlug: project?.slug,
    userId: user?.id
  }
}

function RecentsContainer() {
  const { login, projectId, projectSlug, userId } = useStores()
  const { data: recents = [], error, isLoading } = useRecents({ projectId, userId })
  // Filter the recents to only include those with an attached valid subject.
  // A valid subject attached to the recent is required for the recent to be displayed in RecentsList using the SubjectCard component.
  const validRecents = recents.filter(recent => recent?.subject)

  return (
    <>
      <RecentsHeading />
      <Box
        align='center'
        fill
        justify='center'
        height={{ min: '50vh' }}
      >
        {!userId ? <SignedOutPlaceholder /> 
          : isLoading ? <Loader />
          : error ? <ErrorPlaceholder /> 
          : validRecents.length < 1 ? <EmptyPlaceholder /> 
          : (
            <RecentsList
              login={login}
              projectId={projectId}
              projectSlug={projectSlug}
              recents={validRecents}
              userId={userId}
            />
          )
        }
      </Box>
    </>
  )
}

export default observer(RecentsContainer)
export { RecentsContainer }
