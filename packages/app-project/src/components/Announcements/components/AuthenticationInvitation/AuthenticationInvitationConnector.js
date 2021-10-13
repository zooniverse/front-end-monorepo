import dynamic from 'next/dynamic'
import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'

export const DynamicallyImportedAuthenticationInvitationContainer = dynamic(
  () => import('./AuthenticationInvitationContainer'),
  { ssr: false }
)

function useStores(store) {
  const stores = useContext(MobXProviderContext)
  if (!store) {
    store = stores.store
  }
  const { isLoggedIn } = store.user
  const { sessionCount } = store.user.personalization
  const { isComplete } = store.project
  const afterFive = sessionCount >= 5
  const isVisible = !isLoggedIn && !isComplete && afterFive
  return {
    isVisible
  }
}

function AuthenticationInvitationConnector ({ store }) {
  const { isVisible = false } = useStores(store)

  return (
    <DynamicallyImportedAuthenticationInvitationContainer isVisible={isVisible} />
  )
}

export default observer(AuthenticationInvitationConnector)
export { AuthenticationInvitationConnector }