import { useContext } from 'react';
import { MobXProviderContext, observer } from 'mobx-react'
import ExpertOptionsContainer from './ExpertOptionsContainer'

function useStores() {
  const stores = useContext(MobXProviderContext)

  const {
    demoMode,
    setDemoMode
  } = stores.classifierStore.classifications

  return {
    storeDemoMode: demoMode,
    setDemoMode
  }
}

function ExpertOptionsConnector(props) {
  const {
    storeDemoMode,
    setDemoMode
  } = useStores()

  return (
    <ExpertOptionsContainer
      setDemoMode={setDemoMode}
      storeDemoMode={storeDemoMode}
    />
  )
}

export default observer(ExpertOptionsConnector)