import { inject, observer } from 'mobx-react'
import { array, bool, shape, string } from 'prop-types'
import { useRouter } from 'next/router'
import ProjectHeader from './ProjectHeader'
import { useI18n } from '@translations/i18n'

function storeMapper (stores) {
  return {
    availableLocales: stores.store.project.configuration.languages,
    inBeta: stores.store.project.inBeta,
    isLoggedIn: stores.store.user.isLoggedIn,
    projectName: stores.store.project.display_name,
    defaultWorkflow: stores.store.project.defaultWorkflow
  }
}

function ProjectHeaderContainer ({ availableLocales, className, defaultWorkflow, inBeta, isLoggedIn, projectName }) {
  const router = useRouter()
  const { locale, query } = router
  const { owner, project } = query
  const baseUrl = `/${owner}/${project}`

  const { translate: t } = useI18n(locale, false)

  const classifyHref = defaultWorkflow ? `${baseUrl}/classify/workflow/${defaultWorkflow}` : `${baseUrl}/classify`
  const navLinks = [
    {
      href: `${baseUrl}/about/research`,
      text: t('about')
    },
    {
      href: classifyHref,
      text: t('classify')
    },
    {
      href: `${baseUrl}/talk`,
      text: t('talk')
    },
    {
      href: `${baseUrl}/collections`,
      text: t('collect')
    }
  ]

  if (isLoggedIn) {
    navLinks.push({
      href: `${baseUrl}/recents`,
      text: t('recents')
    })
  }

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
