import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'

import NavLink from '@shared/components/NavLink'
import GenericAnnouncement from '../GenericAnnouncement'

function useStores() {
  const { store } = useContext(MobXProviderContext)

  const { baseUrl, hasResultsPage, isComplete } = store.project

  return {
    baseUrl,
    hasResultsPage,
    isVisible: isComplete
  }
}

function FinishedAnnouncementConnector() {
  const { t } = useTranslation('components')
  const { baseUrl = '', hasResultsPage = true, isVisible = false } = useStores()

  const announcement = t('Announcements.FinishedAnnouncement.announcement')
  const link = {
    href: `/projects${baseUrl}/about/results`,
    text: t('Announcements.FinishedAnnouncement.seeResults')
  }

  if (isVisible) {
    return (
      <GenericAnnouncement announcement={announcement} color='neutral-3'>
        {hasResultsPage && (
          <NavLink color='#000000' link={link} weight='normal' />
        )}
      </GenericAnnouncement>
    )
  }

  return null
}

export default observer(FinishedAnnouncementConnector)
