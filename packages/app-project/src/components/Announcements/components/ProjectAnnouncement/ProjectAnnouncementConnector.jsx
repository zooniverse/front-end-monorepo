import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'

import GenericAnnouncement from '../GenericAnnouncement'

function useStores(mockStore) {
  const stores = useContext(MobXProviderContext)
  const store = mockStore || stores.store
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

function ProjectAnnouncementConnector ({ mockStore, ...props }) {
  const { 
    announcement = '',
    dismissBanner,
    isVisible = false
  } = useStores(mockStore)

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
