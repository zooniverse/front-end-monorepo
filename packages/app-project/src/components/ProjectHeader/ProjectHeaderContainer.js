import { inject, observer } from 'mobx-react'
import { array, bool, shape, string } from 'prop-types'
import React, { Component } from 'react'
import { withRouter } from 'next/router'

import ProjectHeader from './ProjectHeader'
import getNavLinks from './helpers/getNavLinks'

function storeMapper (stores) {
  return {
    isLoggedIn: stores.store.user.isLoggedIn,
    project: stores.store.project
  }
}

@inject(storeMapper)
@withRouter
@observer
class ProjectHeaderContainer extends Component {
  getBaseUrl () {
    const { query } = this.props.router
    return `/projects/${query.owner}/${query.project}`
  }

  getProjectHomeLink () {
    const { query } = this.props.router
    return (query.subroute) ? this.getBaseUrl() : ''
  }

  render () {
    const navLinks = getNavLinks(this.props.isLoggedIn, this.getBaseUrl())

    return (
      <ProjectHeader
        className={this.props.className}
        navLinks={navLinks}
        projectHomeLink={this.getProjectHomeLink()}
        title={this.props.project.display_name}
      />
    )
  }
}

ProjectHeaderContainer.propTypes = {
  isLoggedIn: bool,
  project: shape({
    display_name: string
  }),
  router: shape({
    query: shape({
      subroute: array,
      project: string,
      owner: string
    })
  })
}

export default ProjectHeaderContainer
