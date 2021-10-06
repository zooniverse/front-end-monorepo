import counterpart from 'counterpart'
import { bool, func, shape, string } from 'prop-types'
import React, { Component, useState } from 'react'

import en from './locales/en'
import Banner from '../Banner'
import ConfirmModal from './components/ConfirmModal'

counterpart.registerTranslations('en', en)

const INTENT_NEXT = 'next'
const INTENT_PREVIOUS = 'previous'

function SubjectSetProgressBanner({
  checkForProgress = () => { return false },
  onNext = () => {},
  onPrevious = () => {},
  subject,
  workflow
}) {
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
    // If the user has an annotation in progress, ask for confirmation first.
    if (checkForProgress()) {
      setShowModal(true)
      setIntent(INTENT_NEXT)
      return
    }

    // Otherwise, go ahead and navigate to the new Subject.
    onNext()
  }

  const tryToGoPrevious = () => {
    // If the user has an annotation in progress, ask for confirmation first.
    if (checkForProgress()) {
      setShowModal(true)
      setIntent(INTENT_PREVIOUS)
      return
    }

    // Otherwise, go ahead and navigate to the new Subject.
    onPrevious()
  }

  // If user says no on the Confirm Modal, simply close the modal.
  const onCancel = () => {
    setShowModal(false)
    setIntent(false)
  }

  // If user says yes on the Confirm Modal, navigate to the Next/Prev Subject.
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
