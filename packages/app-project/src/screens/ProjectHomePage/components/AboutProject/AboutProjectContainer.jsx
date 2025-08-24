import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'

import AboutProject from './AboutProject'

function useStores() {
  const stores = useContext(MobXProviderContext)
  const store = stores.store
  const { introduction, display_name } = store?.project

  return {
    description: introduction,
    projectName: display_name
  }
}

function AboutProjectContainer() {
  const { description, projectName } = useStores()
  return (
    <AboutProject
      description={description}
      projectName={projectName}
    />
  )
}

export default observer(AboutProjectContainer)
