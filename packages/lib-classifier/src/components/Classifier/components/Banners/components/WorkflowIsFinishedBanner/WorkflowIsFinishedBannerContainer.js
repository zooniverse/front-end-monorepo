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

class WorkflowIsFinishedBannerContainer extends Component {
  render () {
    const { subject } = this.props
    const show = !!subject &&
      subject.id &&
      subject.finished_workflow

    return (
      <Banner
        background='status-critical'
        bannerText={counterpart('WorkflowIsFinishedBanner.bannerText')}
        show={show}
        tooltipText={counterpart('WorkflowIsFinishedBanner.tooltipText')}
      />
    )
  }
}

WorkflowIsFinishedBannerContainer.propTypes = {
  subject: shape({
    finished_workflow: bool,
    id: string,
    retired: bool
  })
}

@inject(storeMapper)
@observer
class DecoratedWorkflowIsFinishedBannerContainer extends WorkflowIsFinishedBannerContainer { }

export {
  DecoratedWorkflowIsFinishedBannerContainer as default,
  WorkflowIsFinishedBannerContainer
}
