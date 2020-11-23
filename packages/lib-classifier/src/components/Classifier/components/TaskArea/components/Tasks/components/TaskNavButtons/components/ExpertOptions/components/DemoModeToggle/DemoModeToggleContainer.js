import React from 'react'
import { MobXProviderContext, observer } from 'mobx-react'
import DemoModeToggle from './DemoModeToggle'

function useStores() {
  const stores = React.useContext(MobXProviderContext)

  const {
    demoMode,
    setDemoMode
  } = stores.classifierStore.classifications

  return {
    demoMode,
    setDemoMode
  }
}

function DemoModeToggleContainer(props) {
  const {
    demoMode = false,
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

export default observer(DemoModeToggleContainer)