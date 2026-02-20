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
      inBeta,
      slug
    },
    user: {
      adminMode,
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
    adminMode,
    availableLocales,
    defaultWorkflow,
    inBeta,
    isAdmin,
    isLoggedIn,
    organizationSlug,
    organizationTitle,
    slug,
    title
  }
}

export default function useStores() {
  const stores = useContext(MobXProviderContext)
  return storeMapper(stores.store)
}
