import { MobXProviderContext, observer } from 'mobx-react'
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { Anchor } from 'grommet'
import styled from 'styled-components'

import NavLink from '@shared/components/NavLink'
import GenericAnnouncement from '../GenericAnnouncement'

const StyledAnchor = styled(Anchor)`
  line-height: 19px;
`

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
    href: `${baseUrl}/about/results`,
    text: t('Announcements.FinishedAnnouncement.seeResults')
  }

  if (isVisible) {
    return (
      <GenericAnnouncement announcement={announcement} color='neutral-3'>
        {hasResultsPage && (
          <NavLink color='#000000' link={link} weight='normal' StyledAnchor={StyledAnchor} />
        )}
      </GenericAnnouncement>
    )
  }

  return null
}

export default observer(FinishedAnnouncementConnector)
