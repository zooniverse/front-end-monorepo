import counterpart from 'counterpart'
import { bool, shape, string } from 'prop-types'
import React, { Component } from 'react'

import en from './locales/en'
import Banner from '../Banner'

counterpart.registerTranslations('en', en)

function SubjectSetProgressBanner({ subject, workflow }) {
  const subjectTotal = workflow?.subjectSet.set_member_subjects_count
  const background = (subject?.already_seen || subject?.retired) ? 'status-critical' : 'status-ok'
  const color = (subject?.already_seen || subject?.retired) ? 'neutral-6' : 'neutral-7'
  let statusText = subject?.already_seen ? `${counterpart('SubjectSetProgressBanner.alreadySeen')}` : ''
  statusText = subject?.retired ? `${counterpart('SubjectSetProgressBanner.finished')}` : statusText
  const progressText = counterpart('SubjectSetProgressBanner.bannerText', {
    number: subject?.priority,
    total: subjectTotal
  })
  const tooltipText = counterpart('SubjectSetProgressBanner.tooltipText')

  const bannerText = statusText ? `${progressText} (${statusText})`: progressText
  return (
    <Banner
      background={background}
      bannerText={bannerText}
      color={color}
      show
      tooltipText={tooltipText}
    />
  )
}

SubjectSetProgressBanner.propTypes = {
  subject: shape({
    already_seen: bool,
    finished_workflow: bool,
    id: string,
    retired: bool,
    user_has_finished_workflow: bool
  })
}

export default SubjectSetProgressBanner
