import { MobXProviderContext, observer } from 'mobx-react'
import React from 'react'
import counterpart from 'counterpart'

import NavLink from '@shared/components/NavLink'
import en from './locales/en'
import GenericAnnouncement from '../GenericAnnouncement'

counterpart.registerTranslations('en', en)

function useStores() {
  const stores = React.useContext(MobXProviderContext)
  // TODO: Add a boolean that returns the state of the existence of a results page
  const { baseUrl, isComplete } = stores.store.project

  return {
    baseUrl,
    isVisible: isComplete
  }
}

function FinishedAnnouncementConnector () {
  const { 
    baseUrl = '',
    isVisible = false
  } = useStores()
  const announcement = counterpart('FinishedAnnouncement.announcement')
  const link = {
    href: `${baseUrl}/about/results`,
    text: counterpart('FinishedAnnouncement.seeResults')
  }

  if (isVisible) {
    return (
      <GenericAnnouncement
        announcement={announcement}
        color='neutral-3'
      >
        <NavLink color='#000000' link={link} weight='normal' />
      </GenericAnnouncement>
    )
  }

  return null
}

export default observer(FinishedAnnouncementConnector)
export { FinishedAnnouncementConnector }
