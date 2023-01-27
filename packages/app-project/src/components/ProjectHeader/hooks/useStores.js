import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

function storeMapper(store) {
  const {
    project: {
      configuration: {
        languages
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

  const availableLocales = languages?.map(current => {
    const [language, dialect] = current.split('-')
    if (dialect) {
      return `${language}-${dialect.toUpperCase()}`
    }
    return language
  })

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
