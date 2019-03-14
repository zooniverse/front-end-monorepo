import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import React, { Component } from 'react'

import Avatar from './Avatar'

function storeMapper (stores) {
  const { project } = stores.store
  console.info(project)
  return {
    avatarSrc: project.avatar.src,
    projectTitle: project.display_name
  }
}

@inject(storeMapper)
@observer
class AvatarContainer extends Component {
  render () {
    const { avatarSrc, projectTitle } = this.props
    return (
      <Avatar projectTitle={projectTitle} src={avatarSrc} />
    )
  }
}

AvatarContainer.propTypes = {
  avatarSrc: string,
  projectTitle: string,
}

export default AvatarContainer
