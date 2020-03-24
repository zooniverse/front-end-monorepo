import React from 'react'
import { MobXProviderContext } from 'mobx-react'

export default function useStores () {
  return React.useContext(MobXProviderContext)
}