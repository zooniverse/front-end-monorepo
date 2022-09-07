import dynamic from 'next/dynamic'
import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'

export const DynamicallyImportedAuthenticationInvitationContainer = dynamic(
  () => import('./AuthenticationInvitationContainer'),
  { ssr: false }
)

function useStores(mockStore) {
  const stores = useContext(MobXProviderContext)
  const store = mockStore || stores.store

  const { isLoggedIn } = store.user
  const { sessionCount } = store.user.personalization
  const { isComplete } = store.project
  const afterFive = sessionCount >= 5
  const isVisible = !isLoggedIn && !isComplete && afterFive
  return {
    isVisible
  }
}

function AuthenticationInvitationConnector ({ mockStore }) {
  const { isVisible = false } = useStores(mockStore)

  return (
    <DynamicallyImportedAuthenticationInvitationContainer isVisible={isVisible} />
  )
}

export default observer(AuthenticationInvitationConnector)
export { AuthenticationInvitationConnector }