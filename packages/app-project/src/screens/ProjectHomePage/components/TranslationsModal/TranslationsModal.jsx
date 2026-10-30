import { useContext, useState } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { Modal } from '@zooniverse/react-components'
import { Trans, useTranslation } from 'next-i18next/pages'
import { Anchor, Button, Paragraph } from 'grommet'
import { usePathname } from 'next/navigation'

import addQueryParams from '@helpers/addQueryParams'
import localeMenu from '@helpers/localeMenu'

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

/* Only show the modal when project.configuration.languages does not includes the current locale */
export default function TranslationsModal({ locale }) {
  const { store } = useContext(MobXProviderContext)
  const { availableLocales } = storeMapper(store)

  const { t } = useTranslation('screens')

  const [active, setActive] = useState(true)

  const pathname = usePathname()

  const languageName = localeMenu[locale] ?? ''

  function closeFn() {
    setActive(false)
  }

  if (availableLocales?.includes(locale)) {
    return null
  }

  return (
    <Modal
      active={active}
      closeFn={closeFn}
      role='dialog'
      title={t('Home.TranslationsModal.title', { languageName })}
      pad='small'
    >
      <Paragraph margin='0' textAlign='center'>
        {t('Home.TranslationsModal.paragraph')}
      </Paragraph>
      <Paragraph textAlign='center'>
        <Trans
          i18nKey={t('Home.TranslationsModal.cta')}
          t={t}
          components={[<Anchor key='contact-us-about-translations' href='about#contact' />]}
        />
      </Paragraph>
      <Button
        href={addQueryParams(`/projects${pathname}`)}
        label={t('Home.TranslationsModal.buttons.switchToEn')}
        alignSelf='center'
        pad={{ horizontal: 'medium' }}
      />
    </Modal>
  )
}
