import { inject, observer } from 'mobx-react'
import { array, bool, shape, string } from 'prop-types'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import ProjectHeader from './ProjectHeader'

function storeMapper (stores) {
  return {
    availableLocales: stores.store.project.configuration.languages,
    inBeta: stores.store.project.inBeta,
    isLoggedIn: stores.store.user.isLoggedIn,
    projectName: stores.store.project.display_name,
    defaultWorkflow: stores.store.project.defaultWorkflow
  }
}

function getBaseUrl (router) {
  const { owner, project } = router.query
  return `/${owner}/${project}`
}

function ProjectHeaderContainer ({ availableLocales, className, defaultWorkflow, inBeta, isLoggedIn, projectName }) {
  const router = useRouter()
  const { t } = useTranslation('components')

  function getNavLinks (isLoggedIn, baseUrl, defaultWorkflow) {
    const classifyHref = defaultWorkflow ? `${baseUrl}/classify/workflow/${defaultWorkflow}` : `${baseUrl}/classify`
    const links = [
      {
        href: `${baseUrl}/about/research`,
        text: t('ProjectHeader.about')
      },
      {
        href: classifyHref,
        text: t('ProjectHeader.classify')
      },
      {
        href: `${baseUrl}/talk`,
        text: t('ProjectHeader.talk'),
        pfe: true
      },
      {
        href: `${baseUrl}/collections`,
        text: t('ProjectHeader.collect'),
        pfe: true
      }
    ]

    if (isLoggedIn) {
      links.push({
        href: `${baseUrl}/recents`,
        text: t('ProjectHeader.recents'),
        pfe: true
      })
    }

    return links
  }

  const navLinks = getNavLinks(isLoggedIn, getBaseUrl(router), defaultWorkflow)

  return (
    <ProjectHeader
      availableLocales={availableLocales}
      className={className}
      inBeta={inBeta}
      navLinks={navLinks}
      title={projectName}
    />
  )
}

ProjectHeaderContainer.defaultProps = {
  availableLocales: [],
  inBeta: false,
  isLoggedIn: false
}

ProjectHeaderContainer.propTypes = {
  availableLocales: array,
  inBeta: bool,
  isLoggedIn: bool,
  projectName: string.isRequired,
  router: shape({
    query: shape({
      project: string,
      owner: string
    })
  })
}

const DecoratedProjectHeaderContainer = inject(storeMapper)(observer(ProjectHeaderContainer))

export {
  DecoratedProjectHeaderContainer as default,
  ProjectHeaderContainer
}
