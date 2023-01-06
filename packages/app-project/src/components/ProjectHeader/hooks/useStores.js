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

  const availableLocales = languages.reduce((acc, current) => {
    let newLocale = current
    if (current === 'zh-cn') newLocale = 'zh-CN'
    if (current === 'zh-tw') newLocale = 'zh-TW'
    acc.push(newLocale)
    return acc
  }, [])

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
