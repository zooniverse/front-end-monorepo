import { inject, observer } from 'mobx-react'
import { bool, shape, string } from 'prop-types'
import { useRouter } from 'next/router'

import ProjectHeader from './ProjectHeader'
import getNavLinks from './helpers/getNavLinks'

function storeMapper (stores) {
  return {
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

function ProjectHeaderContainer ({ className, defaultWorkflow, inBeta, isLoggedIn, projectName }) {
  const router = useRouter()
  const navLinks = getNavLinks(isLoggedIn, getBaseUrl(router), defaultWorkflow)

  return (
    <ProjectHeader
      className={className}
      inBeta={inBeta}
      navLinks={navLinks}
      title={projectName}
    />
  )
}

ProjectHeaderContainer.defaultProps = {
  inBeta: false,
  isLoggedIn: false
}

ProjectHeaderContainer.propTypes = {
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
