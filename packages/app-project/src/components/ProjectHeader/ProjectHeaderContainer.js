import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import { bool, shape, string } from 'prop-types'
import React, { Component } from 'react'

import ProjectHeader from './ProjectHeader'
import getNavLinks from './helpers/getNavLinks'

function storeMapper (stores) {
  return {
    isLoggedIn: stores.store.user.isLoggedIn
  }
}

class ProjectHeaderContainer extends Component {
  getParams () {
    const { owner, project } = this.props.router.query
    return { owner, project }
  }

  render () {
    const navLinks = getNavLinks(this.props.isLoggedIn, this.getParams())
    return (
      <ProjectHeader navLinks={navLinks} />
    )
  }
}

ProjectHeaderContainer.propTypes = {
  isLoggedIn: bool,
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
