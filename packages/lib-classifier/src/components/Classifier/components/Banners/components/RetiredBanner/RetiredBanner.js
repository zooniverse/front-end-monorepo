import counterpart from 'counterpart'
import { bool, shape, string } from 'prop-types'
import React from 'react'

import en from './locales/en'
import Banner from '../Banner'

counterpart.registerTranslations('en', en)

export default function RetiredBanner({ subject }) {
  const show = !!subject &&
    subject.id &&
    subject.retired &&
    !subject.finished_workflow &&
    !subject.user_has_finished_workflow

  return (
    <Banner
      background='status-critical'
      bannerText={counterpart('RetiredBanner.bannerText')}
      show={show}
      tooltipText={counterpart('RetiredBanner.tooltipText')}
    />
  )
}

RetiredBanner.propTypes = {
  /** The current subject */
  subject: shape({
    finished_workflow: bool,
    id: string,
    retired: bool,
    user_has_finished_workflow: bool
  })
}
