import { inject, observer } from 'mobx-react'
import { node, string } from 'prop-types'
import React, { Component } from 'react'

import Avatar from './Avatar'

function storeMapper (stores) {
  const { project } = stores.store
  return {
    avatarSrc: project.avatar.src,
    projectTitle: project.display_name
  }
}

@inject(storeMapper)
@observer
class AvatarContainer extends Component {
  render () {
    const { avatarSrc, child: Child, projectTitle } = this.props
    return (
      <Child projectTitle={projectTitle} src={avatarSrc} />
    )
  }
}

AvatarContainer.propTypes = {
  avatarSrc: string,
  child: node,
  projectTitle: string,
}

AvatarContainer.defaultProps = {
  child: Avatar
}

export default AvatarContainer
