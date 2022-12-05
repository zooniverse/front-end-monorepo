import { useContext } from 'react';
import { MobXProviderContext, observer } from 'mobx-react'
import DemoModeToggle from './DemoModeToggle'

function useStores() {
  const stores = useContext(MobXProviderContext)

  const {
    demoMode,
    setDemoMode
  } = stores.classifierStore.classifications

  return {
    demoMode,
    setDemoMode
  }
}

function DemoModeToggleConnector(props) {
  const {
    demoMode,
    setDemoMode
  } = useStores()

  return (
    <DemoModeToggle
      demoMode={demoMode}
      setDemoMode={setDemoMode}
      {...props}
    />
  )
}

export default observer(DemoModeToggleConnector)