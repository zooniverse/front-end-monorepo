import { inject, observer } from 'mobx-react'
import { bool, shape, string } from 'prop-types'
import React, { Component } from 'react'
import { withRouter } from 'next/router'

import ProjectHeader from './ProjectHeader'
import getNavLinks from './helpers/getNavLinks'

function storeMapper (stores) {
  return {
    isLoggedIn: stores.store.user.isLoggedIn,
    projectName: stores.store.project['display_name']
  }
}


class ProjectHeaderContainer extends Component {
  getBaseUrl () {
    const { owner, project } = this.props.router.query
    return `/projects/${owner}/${project}`
  }

  render () {
    const navLinks = getNavLinks(this.props.isLoggedIn, this.getBaseUrl())

    return (
      <ProjectHeader
        className={this.props.className}
        navLinks={navLinks}
        title={this.props.projectName}
      />
    )
  }
}

ProjectHeaderContainer.propTypes = {
  isLoggedIn: bool,
  projectName: string,
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
