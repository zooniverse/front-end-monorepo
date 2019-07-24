import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import { string } from 'prop-types'
import React, { Component } from 'react'

import ProjectTitle from './ProjectTitle'

function storeMapper (stores) {
  return {
    title: stores.store.project['display_name']
  }
}

class ProjectTitleContainer extends Component {
  render () {
    const { router, title } = this.props
    const { pathname, query: { owner, project } } = router
    let link = null

    if (pathname !== '/home') {
      link = {
        as: `/projects/${owner}/${project}`,
        href: { pathname: '/home', query: { owner, project } }
      }
    }

    return (
      <ProjectTitle link={link} title={title} />
    )
  }
}

ProjectTitleContainer.propTypes = {
  title: string
}

@inject(storeMapper)
@withRouter
@observer
class DecoratedProjectTitleContainer extends ProjectTitleContainer {}

export {
  DecoratedProjectTitleContainer as default,
  ProjectTitleContainer
}
