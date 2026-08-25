import { Loader } from '@zooniverse/react-components'
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
  const validRecents = recents.filter(recent => recent?.subject)

  if (!userId) {
    return <SignedOutPlaceholder />
  }
  if (isLoading) {
    return <Loader />
  }
  if (error) {
    return <ErrorPlaceholder />
  }
  if (validRecents.length < 1) {
    return <EmptyPlaceholder />
  }

  return (
    <>
      <RecentsHeading />
      <RecentsList
        login={login}
        projectId={projectId}
        projectSlug={projectSlug}
        recents={validRecents}
        userId={userId}
      />
    </>
  )
}

export default observer(RecentsContainer)
export { RecentsContainer }
