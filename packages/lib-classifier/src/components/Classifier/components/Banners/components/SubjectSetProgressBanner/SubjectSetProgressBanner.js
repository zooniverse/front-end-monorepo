import counterpart from 'counterpart'
import { bool, func, shape, string } from 'prop-types'
import React, { Component, useState } from 'react'

import en from './locales/en'
import Banner from '../Banner'
import ConfirmModal from './components/ConfirmModal'

counterpart.registerTranslations('en', en)

const INTENT_NEXT = 'next'
const INTENT_PREVIOUS = 'previous'

function SubjectSetProgressBanner({ checkForProgress, onNext, onPrevious, subject, workflow }) {
  const [ showModal, setShowModal ] = useState(false)
  const [ intent, setIntent ] = useState(undefined)

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
    console.log('+++ checkForProgress : ', checkForProgress())
    setShowModal(true)
    setIntent(INTENT_NEXT)
    // onNext()
  }

  const tryToGoPrevious = () => {
    console.log('+++ checkForProgress : ', checkForProgress())
    setShowModal(true)
    setIntent(INTENT_PREVIOUS)
    // onPrevious()
  }

  const onCancel = () => {
    setShowModal(false)
    setIntent(false)
  }

  const onConfirm = () => {
    if (intent === INTENT_NEXT) {
      setShowModal(false)
      setIntent(false)
      onNext()
    } else if (intent === INTENT_PREVIOUS) {
      setShowModal(false)
      setIntent(false)
      onPrevious()
    }
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
      {showModal && (
        <ConfirmModal
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      )}
    </>
  )
}

SubjectSetProgressBanner.propTypes = {
  checkForProgress: func,
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
