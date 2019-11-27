import counterpart from 'counterpart'
import { inject, observer } from 'mobx-react'
import { bool, shape, string } from 'prop-types'
import React, { Component } from 'react'

import en from './locales/en'
import Banner from '../Banner'

counterpart.registerTranslations('en', en)

function storeMapper (stores) {
  return {
    subject: stores.classifierStore.subjects.active
  }
}

class AlreadySeenBannerContainer extends Component {
  render () {
    const { subject } = this.props
    const show = !!subject &&
      subject.id &&
      subject.already_seen &&
      !subject.retired &&
      !subject.finished_workflow &&
      !subject.user_has_finished_workflow

    return (
      <Banner
        background='status-ok'
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
    finished_workflow: bool,
    id: string,
    retired: bool,
    user_has_finished_workflow: bool
  })
}

@inject(storeMapper)
@observer
class DecoratedAlreadySeenBannerContainer extends AlreadySeenBannerContainer { }

export {
  DecoratedAlreadySeenBannerContainer as default,
  AlreadySeenBannerContainer
}
