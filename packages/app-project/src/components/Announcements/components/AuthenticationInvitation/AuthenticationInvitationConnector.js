import { MobXProviderContext, observer } from 'mobx-react'
import React from 'react'
import AuthenticationInvitationContainer from './AuthenticationInvitationContainer'

function useStores() {
  const stores = React.useContext(MobXProviderContext)
  const { isLoggedIn } = stores.store.user
  const { sessionCount } = stores.store.yourStats
  const { isComplete } = stores.store.project
  const afterFive = sessionCount >= 5
  const isVisible = !isLoggedIn && !isComplete && afterFive
  return {
    isVisible
  }
}

function AuthenticationInvitationConnector (props) {
  const { isVisible = false } = useStores()

  return (
    <AuthenticationInvitationContainer isVisible={isVisible} />
  )
}

export default observer(AuthenticationInvitationConnector)
export { AuthenticationInvitationConnector }