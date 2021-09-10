import counterpart from 'counterpart'
import { bool, shape, string } from 'prop-types'
import React from 'react'

import en from './locales/en'
import Banner from '../Banner'

counterpart.registerTranslations('en', en)

export default function  WorkflowIsFinishedBanner({ subject }) {
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

WorkflowIsFinishedBanner.propTypes = {
  /** The current subject */
  subject: shape({
    finished_workflow: bool,
    id: string,
    retired: bool
  })
}
