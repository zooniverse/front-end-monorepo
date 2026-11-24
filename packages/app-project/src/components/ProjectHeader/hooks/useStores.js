import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

function storeMapper(store) {
  const {
    organizations: organizationsMap,
    project: {
      configuration: {
        languages
      },
      defaultWorkflow,
      display_name: title,
      id: projectId,
      inBeta,
      redirect,
      slug
    },
    user: {
      id: userId,
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
    organizations: Array.from(organizationsMap.values()),
    projectId,
    redirect,
    slug,
    title,
    userId
  }
}

export default function useStores() {
  const stores = useContext(MobXProviderContext)
  return storeMapper(stores.store)
}
