import { useTranslation } from 'next-i18next'

import { useStores } from '.'

export default function useProjectNavigation(adminMode) {
  const { isAdmin, isLoggedIn, defaultWorkflow, slug } = useStores()
  const { t } = useTranslation('components')
  const classifyHref = defaultWorkflow ? `/${slug}/classify/workflow/${defaultWorkflow}` : `/${slug}/classify`
  const links = [
    {
      href: `/${slug}/about/research`,
      text: t('ProjectHeader.about')
    },
    {
      href: classifyHref,
      text: t('ProjectHeader.classify')
    },
    {
      href: `/projects/${slug}/talk`,
      text: t('ProjectHeader.talk'),
      externalLink: true // code is in PFE
    },
    {
      href: `/projects/${slug}/collections`,
      text: t('ProjectHeader.collect'),
      externalLink: true // code is in PFE
    }
  ]

  if (isLoggedIn) {
    links.push({
      href: `/projects/${slug}/recents`,
      text: t('ProjectHeader.recents'),
      externalLink: true // code is in PFE
    })
  }

  if (isLoggedIn && isAdmin && adminMode) {
    links.push({
      href: `https://www.zooniverse.org/admin/project_status/${slug}`,
      text: t('ProjectHeader.admin'),
      externalLink: true // code is in PFE
    })
  }

  return links
}
