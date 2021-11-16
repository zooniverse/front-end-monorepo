// import counterpart from 'counterpart'

import { useI18n } from '@translations/i18n'
import { useRouter } from 'next/router'

function getNavLinks (isLoggedIn, baseUrl, defaultWorkflow) {
  const router = useRouter()
  const { locale } = router
  const { translate: t } = useI18n(locale, false)

  const classifyHref = defaultWorkflow ? `${baseUrl}/classify/workflow/${defaultWorkflow}` : `${baseUrl}/classify`
  const links = [
    {
      href: `${baseUrl}/about/research`,
      text: t('about')
      // text: counterpart('ProjectHeader.nav.about')
    },
    {
      href: classifyHref,
      text: t('classify')
      // text: counterpart('ProjectHeader.nav.classify')
    },
    {
      href: `${baseUrl}/talk`,
      text: t('talk')
      // text: counterpart('ProjectHeader.nav.talk')
    },
    {
      href: `${baseUrl}/collections`,
      text: t('collect')
      // text: counterpart('ProjectHeader.nav.collect')
    }
  ]

  if (isLoggedIn) {
    links.push({
      href: `${baseUrl}/recents`,
      text: t('recents')
      // text: counterpart('ProjectHeader.nav.recents')
    })
  }

  return links
}

export default getNavLinks
