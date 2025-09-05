import { observer } from 'mobx-react'

import { useStores } from '@hooks'
import DemoModeToggle from './DemoModeToggle'

function storeMapper(classifierStore) {
  const { demoMode, setDemoMode } = classifierStore.classifications

  return {
    demoMode,
    setDemoMode
  }
}

function DemoModeToggleConnector(props) {
  const { demoMode, setDemoMode } = useStores(storeMapper)

  return (
    <DemoModeToggle demoMode={demoMode} setDemoMode={setDemoMode} {...props} />
  )
}

export default observer(DemoModeToggleConnector)
