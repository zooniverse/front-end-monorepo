import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'

import ConnectWithProject from './ConnectWithProject'
import isValidUrl from './helpers/isValidUrl'

function useStore() {
  const { store } = useContext(MobXProviderContext)
  const projectName = store.project['display_name']
  const urls = store.project.urls

  return {
    projectName,
    urls
  }
}

const ConnectWithProjectContainer = () => {
  const { projectName = '', urls = [] } = useStore()
  const validUrls = urls && urls.filter && urls.filter(urlObject => isValidUrl(urlObject.url))

  return !validUrls || validUrls.length > 0 ? (
    <ConnectWithProject projectName={projectName} urls={urls} />
  ) : null
}

export default observer(ConnectWithProjectContainer)
