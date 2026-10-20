import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

function storeMapper(store) {
  const {
    project: {
      configuration: { languages }
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
    availableLocales
  }
}

/* Only show the popover when project.configuration.languages does not includes the current locale */
export default function TranslationsPopover({ locale }) {
  const { store } = useContext(MobXProviderContext)

  const { availableLocales } = storeMapper(store)
  console.log(availableLocales)
  console.log(availableLocales.includes(locale))

  if (availableLocales?.includes(locale)) {
    return null
  }

  return <div>Popover</div>
}
