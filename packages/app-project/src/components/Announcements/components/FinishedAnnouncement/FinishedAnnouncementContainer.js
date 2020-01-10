import { inject, observer } from 'mobx-react'
import { func, shape, string, bool } from 'prop-types'
import React, { Component } from 'react'
import counterpart from 'counterpart'
import { withTheme } from 'styled-components'
import { lighten } from 'polished'

import NavLink from '@shared/components/NavLink'
import en from './locales/en'
import GenericAnnouncement from '../GenericAnnouncement'

counterpart.registerTranslations('en', en)

function storeMapper(stores) {
  // TODO: Add a boolean that returns the state of the existence of a results page
  const { baseUrl, isComplete } = stores.store.project

  return {
    baseUrl,
    isVisible: isComplete
  }
}

class FinishedAnnouncementContainer extends Component {
  render() {
    const { baseUrl, isVisible, theme } = this.props
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
}

FinishedAnnouncementContainer.propTypes = {
  announcement: string,
  baseUrl: string,
  dismissBanner: func,
  isVisible: bool,
  theme: shape({
    global: shape({
      colors: shape({
        'accent-2': string,
        brand: string
      })
    })
  })
}

FinishedAnnouncementContainer.defaultProps = {
  announcement: '',
  baseUrl: '',
  dismissBanner: () => {},
  isVisible: false,
  theme: {
    global: {
      colors: {}
    }
  }
}

@inject(storeMapper)
@withTheme
@observer
class DecoratedFinishedAnnouncementContainer extends FinishedAnnouncementContainer { }

export {
  DecoratedFinishedAnnouncementContainer as default,
  FinishedAnnouncementContainer
}
