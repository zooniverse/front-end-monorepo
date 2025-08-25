import { observer, MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'

import Background from './Background'

function useStores() {
  const { store } = useContext(MobXProviderContext)
  const { src } = store.project?.background
  return {
    backgroundSrc: src
  }
}

function BackgroundContainer () {
  const { backgroundSrc } = useStores()

  return (
    <Background backgroundSrc={backgroundSrc} />
  )
}

export default observer(BackgroundContainer)
