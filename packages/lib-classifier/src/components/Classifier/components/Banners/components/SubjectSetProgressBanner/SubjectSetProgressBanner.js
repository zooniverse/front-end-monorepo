import { bool, func, number, shape, string } from 'prop-types'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Banner from '../Banner'
import ConfirmModal from './components/ConfirmModal'

/**
  A banner which shows progress through a prioritised subject set, showing `subject.metadata.priority` to the volunteer.

  Optionally, it can also show Next and Previous subject navigation buttons for indexed workflows.
*/
function SubjectSetProgressBanner({
  checkForProgress = false,
  onNext,
  onPrevious,
  subject,
  workflow
}) {
  const { t } = useTranslation('components')

  const [ showModal, setShowModal ] = useState(false)
  const [ intent, setIntent ] = useState(undefined)

  const setName = workflow?.subjectSet?.display_name || ''
  const subjectTotal = workflow?.subjectSet?.set_member_subjects_count
  const background = (subject?.alreadySeen || subject?.retired) ? 'status-critical' : 'status-ok'
  const color = (subject?.alreadySeen || subject?.retired) ? 'neutral-6' : 'neutral-7'
  let statusText = subject?.alreadySeen ? `${t('Banners.SubjectSetProgressBanner.alreadySeen')}` : ''
  statusText = subject?.retired ? `${t('Banners.SubjectSetProgressBanner.finished')}` : statusText
  const progressText = `${t('Banners.SubjectSetProgressBanner.bannerText', { setName })} ${subject?.priority}/${subjectTotal}`
  const tooltipText = t('Banners.SubjectSetProgressBanner.tooltipText', { returnObjects: true })

  const bannerText = statusText ? `${progressText} (${statusText})` : progressText

  const tryToGoNext = () => {
    // If the user has an annotation in progress, ask for confirmation first.
    if (checkForProgress) {
      setShowModal(true)
      setIntent(() => onNext) // This is how you set a function with useState
      return
    }

    // Otherwise, go ahead and navigate to the new Subject.
    onNext()
  }

  const tryToGoPrevious = () => {
    // If the user has an annotation in progress, ask for confirmation first.
    if (checkForProgress) {
      setShowModal(true)
      setIntent(() => onPrevious)
      return
    }

    // Otherwise, go ahead and navigate to the new Subject.
    onPrevious()
  }

  // If user says no on the Confirm Modal, simply close the modal.
  const onCancel = () => {
    setShowModal(false)
    setIntent(undefined)
  }

  // If user says yes on the Confirm Modal, close the modal and proceed.
  const onConfirm = () => {
    intent && intent()
    setShowModal(false)
    setIntent(undefined)
  }

  return (
    <>
      <Banner
        background={background}
        bannerText={bannerText}
        color={color}
        onNext={(onNext) ? tryToGoNext : undefined}
        onPrevious={(onPrevious) ? tryToGoPrevious : undefined}
        show
        tooltipText={tooltipText}
      />
      <ConfirmModal
        active={showModal}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </>
  )
}

SubjectSetProgressBanner.propTypes = {
  /** Check for classification work in progress. */
  checkForProgress: bool,
  /** Callback to load the next subject (indexed workflows only.) */
  onNext: func,
  /** Callback to load the previous subject (indexed workflows only.) */
  onPrevious: func,
  /** The active subject */
  subject: shape({
    alreadySeen: bool,
    finished_workflow: bool,
    id: string,
    retired: bool,
    user_has_finished_workflow: bool
  }),
  /** The active workflow */
  workflow: shape({
    subjectSet: shape({
      display_name: string,
      set_member_subjects_count: number
    })
  })
}

export default SubjectSetProgressBanner
