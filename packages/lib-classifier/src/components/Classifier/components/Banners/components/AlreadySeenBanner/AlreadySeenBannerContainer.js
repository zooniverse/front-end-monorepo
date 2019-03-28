import zooTheme from '@zooniverse/grommet-theme'
import counterpart from 'counterpart'
import { inject, observer } from 'mobx-react'
import { bool, shape, string } from 'prop-types'
import React, { Component } from 'react'

import en from './locales/en'
import Banner from '../Banner'

counterpart.registerTranslations('en', en)

function storeMapper (stores) {
  return {
    subject: stores.classifierStore.subjects.active || {}
  }
}

@inject(storeMapper)
@observer
class AlreadySeenBannerContainer extends Component {
  render () {
    const background = zooTheme.global.colors.statusColors.ok
    const { subject } = this.props
    const show = subject.id && subject.already_seen && !subject.retired

    return (
      <Banner
        background={background}
        bannerText={counterpart('AlreadySeenBanner.bannerText')}
        show={show}
        tooltipText={counterpart('AlreadySeenBanner.tooltipText')}
      />
    )
  }
}

AlreadySeenBannerContainer.propTypes = {
  subject: shape({
    already_seen: bool,
    id: string,
    retired: bool
  })
}

AlreadySeenBannerContainer.defaultProps = {
  subject: {}
}

export default AlreadySeenBannerContainer
