import counterpart from 'counterpart'
import { bool, shape, string } from 'prop-types'
import React from 'react'

import en from './locales/en'
import Banner from '../Banner'

counterpart.registerTranslations('en', en)

export default function AlreadySeenBanner({ subject }) {
  const show = !!subject &&
    subject.id &&
    subject.alreadySeen &&
    !subject.retired &&
    !subject.finished_workflow &&
    !subject.user_has_finished_workflow

  return (
    <Banner
      background='status-ok'
      bannerText={counterpart('AlreadySeenBanner.bannerText')}
      color='neutral-7'
      show={show}
      tooltipText={counterpart('AlreadySeenBanner.tooltipText')}
    />
  )
}

AlreadySeenBanner.propTypes = {
  /** The current subject. */
  subject: shape({
    alreadySeen: bool,
    finished_workflow: bool,
    id: string,
    retired: bool,
    user_has_finished_workflow: bool
  })
}
