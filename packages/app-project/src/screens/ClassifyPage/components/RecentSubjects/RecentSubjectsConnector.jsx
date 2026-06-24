import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'

import RecentSubjects from './RecentSubjects'

function storeMapper (store) {
  const {
    project,
    user: {
      id: userId,
      isLoggedIn,
      login,
      recents : {
        recents
      }
    }
  } = store

  return {
    isLoggedIn,
    login,
    projectId: project.id,
    recents,
    slug: project.slug,
    userId
  }
}

function RecentSubjectsConnector({ size }) {
  const { store } = useContext(MobXProviderContext)
  const { isLoggedIn, login, projectId, recents, slug, userId } = storeMapper(store)
  return (
    <RecentSubjects
      isLoggedIn={isLoggedIn}
      login={login}
      projectId={projectId}
      recents={recents.slice()}
      size={size}
      slug={slug}
      userId={userId}
    />
  )
}

export default observer(RecentSubjectsConnector)
