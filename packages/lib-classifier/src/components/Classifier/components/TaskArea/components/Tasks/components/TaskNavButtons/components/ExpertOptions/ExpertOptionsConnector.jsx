import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import ExpertOptionsContainer from './ExpertOptionsContainer'

function storeMapper(classifierStore) {
  const { demoMode, setDemoMode } = classifierStore.classifications

  return {
    storeDemoMode: demoMode,
    setDemoMode
  }
}

function ExpertOptionsConnector() {
  const { storeDemoMode, setDemoMode } = useStores(storeMapper)

  return (
    <ExpertOptionsContainer
      setDemoMode={setDemoMode}
      storeDemoMode={storeDemoMode}
    />
  )
}

export default observer(ExpertOptionsConnector)
