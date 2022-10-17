import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

function storeMapper(store) {
  const {
    project: {
      configuration: {
        languages: availableLocales
      },
      defaultWorkflow,
      display_name: title,
      inBeta,
      slug
    },
    user: {
      isAdmin,
      isLoggedIn
    }
  } = store

  return {
    availableLocales,
    defaultWorkflow,
    inBeta,
    isAdmin,
    isLoggedIn,
    slug,
    title
  }
}

export default function useStores() {
  const stores = useContext(MobXProviderContext)
  return storeMapper(stores.store)
}
