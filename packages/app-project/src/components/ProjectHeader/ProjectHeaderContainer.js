import { inject, observer } from 'mobx-react'
import { bool, shape, string } from 'prop-types'
import React, { Component } from 'react'
import { withRouter } from 'next/router'

import ProjectHeader from './ProjectHeader'
import getNavLinks from './helpers/getNavLinks'

function storeMapper (stores) {
  return {
    inBeta: stores.store.project.inBeta,
    isLoggedIn: stores.store.user.isLoggedIn,
    projectName: stores.store.project.display_name
  }
}

class ProjectHeaderContainer extends Component {
  getBaseUrl () {
    const { owner, project } = this.props.router.query
    return `/projects/${owner}/${project}`
  }

  render () {
    const { className, inBeta, isLoggedIn, projectName } = this.props
    const navLinks = getNavLinks(isLoggedIn, this.getBaseUrl())

    return (
      <ProjectHeader
        className={className}
        inBeta={inBeta}
        navLinks={navLinks}
        title={projectName}
      />
    )
  }
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

@inject(storeMapper)
@withRouter
@observer
class DecoratedProjectHeaderContainer extends ProjectHeaderContainer {}

export {
  DecoratedProjectHeaderContainer as default,
  ProjectHeaderContainer
}
