import { useTranslation } from 'next-i18next'

import { useHasLabAccess, useStores } from '.'
import PFE_SLUGS from '../../../helpers/slugList'

export default function useProjectNavigation() {
  const { adminMode, isAdmin, isLoggedIn, defaultWorkflow, projectId, slug, userId } = useStores()
  const hasLabAccess = useHasLabAccess(projectId, userId)
  const { t } = useTranslation('components')
  const classifyHref = defaultWorkflow
    ? `/${slug}/classify/workflow/${defaultWorkflow}`
    : `/${slug}/classify`

  const slugArr = slug.split('/')
  const owner = slugArr?.[0]
  const projectName = slugArr?.[1]

  const isPFEProject = PFE_SLUGS.includes(`${owner}/${projectName}`)

  const links = [
    {
      href: isPFEProject ? `https://www.zooniverse.org/projects/${slug}/about/research` : `/${slug}/about/research`,
      text: t('ProjectHeader.about'),
      externalLink: isPFEProject
    },
    {
      href: isPFEProject ? `https://www.zooniverse.org/projects/${slug}/classify` : classifyHref,
      text: t('ProjectHeader.classify'),
      externalLink: isPFEProject
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

  if (isLoggedIn && (hasLabAccess || (isAdmin && adminMode))) {
    links.push({
      href: `/lab/${projectId}`,
      text: t('ProjectHeader.lab'),
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
