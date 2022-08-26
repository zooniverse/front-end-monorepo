import { MobXProviderContext, observer } from 'mobx-react'
import { shape, string } from 'prop-types'
import { useContext } from 'react'

import AboutProject from './AboutProject'

function useStores(store) {
  const stores = useContext(MobXProviderContext)
  store = store || stores.store
  const { introduction, display_name } = store?.project

  return {
    description: introduction,
    projectName: display_name
  }
}

function AboutProjectContainer({ store }) {
  const { description, projectName } = useStores(store)
  return (
    <AboutProject
      description={description}
      projectName={projectName}
    />
  )
}

AboutProjectContainer.propTypes = {
  stores: shape({
    store: shape({
      project: shape({
        introduction: string,
        display_name: string
      })
    })
  })
}

export default observer(AboutProjectContainer)
export { AboutProjectContainer }
