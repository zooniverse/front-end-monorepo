import { inject, observer } from 'mobx-react'
import { bool, node, string } from 'prop-types'
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
    const { avatarSrc, isNarrow, projectTitle } = this.props
    return (
      <Avatar
        projectTitle={projectTitle}
        isNarrow={isNarrow}
        src={avatarSrc}
      />
    )
  }
}

AvatarContainer.propTypes = {
  avatarSrc: string,
  isNarrow: bool,
  projectTitle: string
}

export default AvatarContainer
