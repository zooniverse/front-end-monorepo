import { inject, observer } from 'mobx-react'
import { string } from 'prop-types'
import React, { Component } from 'react'

import ProjectAnnouncement from './ProjectAnnouncement'

function storeMapper (stores) {
  const { announcement } = stores.store.project.configuration
  const {
    dismissAnnouncementBanner,
    showAnnouncement
  } = stores.store.ui

  return {
    announcement,
    dismissBanner: dismissAnnouncementBanner,
    isVisible: showAnnouncement
  }
}

class ProjectAnnouncementContainer extends Component {
  render () {
    const { announcement, dismissBanner, isVisible } = this.props
    return (isVisible && announcement)
      ? <ProjectAnnouncement announcement={announcement} closeFn={dismissBanner} />
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
