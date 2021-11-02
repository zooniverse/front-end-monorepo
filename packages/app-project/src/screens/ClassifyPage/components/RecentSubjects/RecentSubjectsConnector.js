import { MobXProviderContext, observer } from 'mobx-react'
import { array, bool, number, string } from 'prop-types'
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
    projectName: project['display_name'],
    slug: project.slug
  }
}

function RecentSubjectsConnector({ size }) {
  const { store } = useContext(MobXProviderContext)
  const { isLoggedIn, recents, projectName, slug } = storeMapper(store)
  return (
    <RecentSubjects
      isLoggedIn={isLoggedIn}
      recents={recents.slice()}
      projectName={projectName}
      size={size}
      slug={slug}
    />
  )
}

export default observer(RecentSubjectsConnector)
