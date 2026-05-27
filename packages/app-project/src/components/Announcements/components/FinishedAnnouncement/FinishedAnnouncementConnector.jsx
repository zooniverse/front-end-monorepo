import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'

import NavLink from '@shared/components/NavLink'
import GenericAnnouncement from '../GenericAnnouncement'
import PFE_SLUGS from '../../../../helpers/slugList'

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

  const slugArr = baseUrl.split('/')
  const owner = slugArr?.[0]
  const projectName = slugArr?.[1]

  const isPFEProject = PFE_SLUGS.includes(`${owner}/${projectName}`)

  const announcement = t('Announcements.FinishedAnnouncement.announcement')
  const link = {
    href: isPFEProject ? `https://www.zooniverse.org/projects${baseUrl}/about/results` : `${baseUrl}/about/results`,
    text: t('Announcements.FinishedAnnouncement.seeResults'),
    externalLink: isPFEProject
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
