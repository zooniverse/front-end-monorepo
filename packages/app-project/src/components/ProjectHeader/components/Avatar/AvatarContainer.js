import { inject, observer } from 'mobx-react'
import { bool, string } from 'prop-types'
import { Component } from 'react'

import Avatar from './Avatar'

function storeMapper (stores) {
  const { project } = stores.store
  return {
    approved: project.launch_approved,
    avatarSrc: project.avatar.src,
    projectTitle: project.display_name
  }
}

@inject(storeMapper)
@observer
class AvatarContainer extends Component {
  render () {
    const { approved, avatarSrc, isNarrow, projectTitle } = this.props
    return (
      <Avatar
        approved={approved}
        isNarrow={isNarrow}
        projectTitle={projectTitle}
        src={avatarSrc}
      />
    )
  }
}

AvatarContainer.propTypes = {
  approved: bool,
  avatarSrc: string,
  isNarrow: bool,
  projectTitle: string
}

export default AvatarContainer
