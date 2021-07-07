import dynamic from 'next/dynamic'
import { MobXProviderContext, observer } from 'mobx-react'
import * as React from 'react'

export const DynamicallyImportedAuthenticationInvitationContainer = dynamic(
  () => import('./AuthenticationInvitationContainer'),
  { ssr: false }
)

function useStores() {
  const stores = React.useContext(MobXProviderContext)
  const { isLoggedIn } = stores.store.user
  const { sessionCount } = stores.store.user.personalization
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
    <DynamicallyImportedAuthenticationInvitationContainer isVisible={isVisible} />
  )
}

export default observer(AuthenticationInvitationConnector)
export { AuthenticationInvitationConnector }