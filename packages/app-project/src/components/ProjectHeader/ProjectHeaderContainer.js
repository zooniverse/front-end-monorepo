import { useContext } from 'react'
import { observer, MobXProviderContext } from 'mobx-react'
import { string } from 'prop-types'
import { useTranslation } from 'next-i18next'

import ProjectHeader from './ProjectHeader'

function storeMapper(store) {
  const {
    project: {
      configuration: {
        languages: availableLocales
      },
      defaultWorkflow,
      display_name: projectName,
      inBeta,
      slug
    },
    user: {
      isLoggedIn
    }
  } = store

  return {
    availableLocales,
    defaultWorkflow,
    inBeta,
    isLoggedIn,
    projectName,
    slug
  }
}

function useStores(store) {
  const stores = useContext(MobXProviderContext)
  store = store || stores.store
  return storeMapper(store)
}

function ProjectHeaderContainer({
  className = '',
  store
}) {
  const {
    availableLocales,
    defaultWorkflow,
    inBeta,
    isLoggedIn,
    projectName,
    slug
  } = useStores(store)
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
        text: t('ProjectHeader.talk')
      },
      {
        href: `${baseUrl}/collections`,
        text: t('ProjectHeader.collect')
      }
    ]

    if (isLoggedIn) {
      links.push({
        href: `${baseUrl}/recents`,
        text: t('ProjectHeader.recents')
      })
    }

    return links
  }

  const navLinks = getNavLinks(isLoggedIn, `/${slug}`, defaultWorkflow)

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

ProjectHeaderContainer.propTypes = {
  className: string
}

const DecoratedProjectHeaderContainer = observer(ProjectHeaderContainer)

export {
  DecoratedProjectHeaderContainer as default,
  ProjectHeaderContainer
}
