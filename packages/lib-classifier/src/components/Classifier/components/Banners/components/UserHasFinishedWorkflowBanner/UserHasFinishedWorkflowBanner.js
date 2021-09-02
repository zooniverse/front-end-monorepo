import counterpart from 'counterpart'
import { bool, shape, string } from 'prop-types'
import React from 'react'

import en from './locales/en'
import Banner from '../Banner'

counterpart.registerTranslations('en', en)

export default function UserHasFinishedWorkflowBanner({ subject }) {
  const show = !!subject &&
    !subject.finished_workflow &&
    subject.user_has_finished_workflow

  return (
    <Banner
      background='status-warning'
      bannerText={counterpart('UserHasFinishedWorkflowBanner.bannerText')}
      show={show}
      tooltipText={counterpart('UserHasFinishedWorkflowBanner.tooltipText')}
    />
  )
}

UserHasFinishedWorkflowBanner.propTypes = {
  /** The current subject. */
  subject: shape({
    finished_workflow: bool,
    id: string,
    retired: bool
  })
}
