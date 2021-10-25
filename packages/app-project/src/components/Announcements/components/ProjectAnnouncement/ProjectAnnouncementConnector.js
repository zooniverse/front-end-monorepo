import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'

import GenericAnnouncement from '../GenericAnnouncement'

function useStores(store) {
  const stores = useContext(MobXProviderContext)
  if (!store) {
    store = stores.store
  }
  const { announcement } = store.project.configuration
  const {
    dismissProjectAnnouncementBanner,
    showAnnouncement
  } = store.ui

  return {
    announcement,
    dismissBanner: dismissProjectAnnouncementBanner,
    isVisible: showAnnouncement
  }
}

function ProjectAnnouncementConnector ({ store, ...props }) {
  const { 
    announcement = '',
    dismissBanner,
    isVisible = false
  } = useStores(store)

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
