import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'

import RecentSubjects from './RecentSubjects'

function storeMapper (store) {
  const {
    project,
    user: {
      isLoggedIn,
      recents : {
        recents
      }
    }
  } = store

  return {
    isLoggedIn,
    recents,
    slug: project.slug
  }
}

function RecentSubjectsConnector({ size }) {
  const { store } = useContext(MobXProviderContext)
  const { isLoggedIn, recents, slug } = storeMapper(store)
  return (
    <RecentSubjects
      isLoggedIn={isLoggedIn}
      recents={recents.slice()}
      size={size}
      slug={slug}
    />
  )
}

export default observer(RecentSubjectsConnector)
