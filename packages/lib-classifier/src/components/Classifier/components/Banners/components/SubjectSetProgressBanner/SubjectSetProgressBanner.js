import counterpart from 'counterpart'
import { bool, func, shape, string } from 'prop-types'
import React, { Component } from 'react'

import en from './locales/en'
import Banner from '../Banner'

counterpart.registerTranslations('en', en)

function SubjectSetProgressBanner({ annotations, onNext, onPrevious, subject, workflow }) {
  const setName = workflow?.subjectSet?.display_name || ''
  const subjectTotal = workflow?.subjectSet.set_member_subjects_count
  const background = (subject?.alreadySeen || subject?.retired) ? 'status-critical' : 'status-ok'
  const color = (subject?.alreadySeen || subject?.retired) ? 'neutral-6' : 'neutral-7'
  let statusText = subject?.alreadySeen ? `${counterpart('SubjectSetProgressBanner.alreadySeen')}` : ''
  statusText = subject?.retired ? `${counterpart('SubjectSetProgressBanner.finished')}` : statusText
  const progressText = counterpart('SubjectSetProgressBanner.bannerText', {
    number: subject?.priority,
    setName,
    total: subjectTotal
  })
  const tooltipText = counterpart('SubjectSetProgressBanner.tooltipText')

  const bannerText = statusText ? `${progressText} (${statusText})` : progressText

  const tryToGoNext = () => {
    console.log('+++ annotations : ', annotations)
    onNext()
  }

  const tryToGoPrevious = () => {
    onPrevious()
  }

  return (
    <>
      <Banner
        background={background}
        bannerText={bannerText}
        color={color}
        onNext={tryToGoNext}
        onPrevious={tryToGoPrevious}
        show
        tooltipText={tooltipText}
      />
    </>
  )
}

SubjectSetProgressBanner.propTypes = {
  // annotations: ???,  // TODO: what is the propTypes for a shape? object?
  onNext: func,
  onPrevious: func,
  subject: shape({
    alreadySeen: bool,
    finished_workflow: bool,
    id: string,
    retired: bool,
    user_has_finished_workflow: bool
  })
}

export default SubjectSetProgressBanner
