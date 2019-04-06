import { inject, observer } from 'mobx-react'
import { array, shape, string } from 'prop-types'
import React, { Component } from 'react'
import { withRouter } from 'next/router'

import ProjectHeader from './ProjectHeader'

function storeMapper (stores) {
  return {
    project: stores.store.project
  }
}

@inject(storeMapper)
@withRouter
@observer
class ProjectHeaderContainer extends Component {
  getHref () {
    const { query } = this.props.router
    if (query.subroute) {
      return `/projects/${query.owner}/${query.project}`
    }
    return ''
  }

  render () {
    return (
      <ProjectHeader
        className={this.props.className}
        href={this.getHref()}
        title={this.props.project.display_name}
      />
    )
  }
}

ProjectHeaderContainer.propTypes = {
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
