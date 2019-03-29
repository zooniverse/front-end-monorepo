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
    subject: stores.classifierStore.subjects.active
  }
}

@inject(storeMapper)
@observer
class UserHasFinishedWorkflowBannerContainer extends Component {
  render () {
    const background = zooTheme.global.colors.statusColors.warning
    const { subject } = this.props
    const show = !!subject &&
      !subject.finished_workflow &&
      subject.user_has_finished_workflow

    return (
      <Banner
        background={background}
        bannerText={counterpart('UserHasFinishedWorkflowBanner.bannerText')}
        show={show}
        tooltipText={counterpart('UserHasFinishedWorkflowBanner.tooltipText')}
      />
    )
  }
}

UserHasFinishedWorkflowBannerContainer.propTypes = {
  subject: shape({
    finished_workflow: bool,
    id: string,
    retired: bool
  })
}

export default UserHasFinishedWorkflowBannerContainer
