import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import React, { Component } from 'react'

import ProjectAnnouncement from './ProjectAnnouncement'

function storeMapper (stores) {
  const { announcement } = stores.store.project.configuration
  return {
    announcement
  }
}

class ProjectAnnouncementContainer extends Component {
  render () {
    const { announcement } = this.props
    return (announcement)
      ? <ProjectAnnouncement announcement={announcement} />
      : null
  }
}

ProjectAnnouncementContainer.propTypes = {
  announcement: string
}

ProjectAnnouncementContainer.defaultProps = {
  announcement: ''
}

@inject(storeMapper)
@observer
class DecoratedProjectAnnouncementContainer extends ProjectAnnouncementContainer { }

export {
  DecoratedProjectAnnouncementContainer as default,
  ProjectAnnouncementContainer
}
