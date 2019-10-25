import { inject, observer } from 'mobx-react'
import { func, string, bool } from 'prop-types'
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
  announcement: string,
  dismissBanner: func.isRequired,
  isVisible: bool
}

ProjectAnnouncementContainer.defaultProps = {
  announcement: '',
  isVisible: false
}

@inject(storeMapper)
@observer
class DecoratedProjectAnnouncementContainer extends ProjectAnnouncementContainer { }

export {
  DecoratedProjectAnnouncementContainer as default,
  ProjectAnnouncementContainer
}
