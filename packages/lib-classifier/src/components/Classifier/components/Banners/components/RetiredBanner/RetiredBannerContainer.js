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
class RetiredBannerContainer extends Component {
  render () {
    const background = zooTheme.global.colors.statusColors.critical
    const { subject } = this.props
    const show = subject.id && subject.retired

    return (
      <Banner
        background={background}
        bannerText={counterpart('RetiredBanner.bannerText')}
        show={show}
        tooltipText={counterpart('RetiredBanner.tooltipText')}
      />
    )
  }
}

RetiredBannerContainer.propTypes = {
  subject: shape({
    id: string,
    retired: bool
  })
}

RetiredBannerContainer.defaultProps = {
  subject: {}
}

export default RetiredBannerContainer
