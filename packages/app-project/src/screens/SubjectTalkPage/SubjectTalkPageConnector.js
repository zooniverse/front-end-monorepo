import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'

import ProjectSubjectPage from './SubjectTalkPage'

function useStore(store) {
  const { appLoadingState } = store

  return { appLoadingState }
}

function ProjectSubjectPageConnector(props) {
  const { store } = useContext(MobXProviderContext)
  const { appLoadingState } = useStore(store)

  return (
    <ProjectSubjectPage
      {...props}
      appLoadingState={appLoadingState}
    />
  )
}

export default observer(ProjectSubjectPageConnector)
