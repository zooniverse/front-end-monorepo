import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

function storeMapper(store) {
  const {
    organization: {
      slug: organizationSlug,
      title: organizationTitle
    },
    project: {
      configuration: {
        languages
      },
      defaultWorkflow,
      display_name: title,
      id: projectId,
      inBeta,
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
    organizationSlug,
    organizationTitle,
    projectId,
    slug,
    title,
    userId
  }
}

export default function useStores() {
  const stores = useContext(MobXProviderContext)
  return storeMapper(stores.store)
}
