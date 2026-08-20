import { Loader } from '@zooniverse/react-components'
import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'

import useRecents from '@hooks/useRecents'
import EmptyPlaceholder from '../Placeholders/EmptyPlaceholder'
import ErrorPlaceholder from '../Placeholders/ErrorPlaceholder'
import SignedOutPlaceholder from '../Placeholders/SignedOutPlaceholder'
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
  
  if (!userId) {
    return <SignedOutPlaceholder />
  }
  if (isLoading) {
    return <Loader />
  }
  if (error) {
    return <ErrorPlaceholder />
  }
  if (recents.length < 1) {
    return <EmptyPlaceholder />
  }


  return (
    <RecentsList
      login={login}
      projectId={projectId}
      projectSlug={projectSlug}
      recents={recents}
      userId={userId}
    />
  )
}

export default observer(RecentsContainer)
export { RecentsContainer }
