import { MobXProviderContext, observer } from 'mobx-react'
import { shape, object } from 'prop-types'
import React from 'react'
import counterpart from 'counterpart'
import { withTheme } from 'styled-components'
import { lighten } from 'polished'

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

function FinishedAnnouncementConnector ({ theme }) {
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
        color={lighten(0.07, theme.global.colors['status-ok'])}
      >
        <NavLink color='#000000' link={link} weight='normal' />
      </GenericAnnouncement>
    )
  }

  return null
}

FinishedAnnouncementConnector.propTypes = {
  theme: shape({
    global: shape({
      colors: object
    })
  })
}

FinishedAnnouncementConnector.defaultProps = {
  theme: {
    global: {
      colors: {}
    }
  }
}

export default withTheme(observer(FinishedAnnouncementConnector))
export { FinishedAnnouncementConnector }
