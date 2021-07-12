import { MobXProviderContext, observer } from 'mobx-react'
import * as React from 'react'

import GenericAnnouncement from '../GenericAnnouncement'

function useStores () {
  const stores = React.useContext(MobXProviderContext)
  const { announcement } = stores.store.project.configuration
  const {
    dismissProjectAnnouncementBanner,
    showAnnouncement
  } = stores.store.ui

  return {
    announcement,
    dismissBanner: dismissProjectAnnouncementBanner,
    isVisible: showAnnouncement
  }
}

function ProjectAnnouncementConnector (props) {
  const { 
    announcement = '',
    dismissBanner,
    isVisible = false
  } = useStores()

  return (isVisible && announcement)
    ? <GenericAnnouncement
        announcement={announcement}
        color='neutral-2'
        closeFn={dismissBanner}
        dismissable
        {...props}
      />
    : null
}

export default observer(ProjectAnnouncementConnector)
export { ProjectAnnouncementConnector }
