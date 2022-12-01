import { Modal, PlainButton, PrimaryButton } from '@zooniverse/react-components'
import { Paragraph } from 'grommet'
import { bool, func } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useTranslation } from '@translations/i18n'

/**
 A popup which interrupts classification for subjects that are retired or already seen.

 Volunteers are offered options to choose something else to work on, or to dismiss the popup and continue anyway.

 ```
  <DisabledTaskPopup
   isOpen
   onClose={callback}
   target={parentNode}
  />
 ```
*/
export default function DisabledTaskPopup({
  isOpen = false,
  nextAvailable,
  onClose = () => true,
  reset,
  target
}) {
  const { t } = useTranslation('components')
  const [ active, setActive ] = useState(isOpen)

  useEffect(function onLoaded() {
    setActive(isOpen)
  }, [isOpen])

  function closeModal() {
    setActive(false)
    onClose()
  }

  function onReset() {
    setActive(false)
    reset()
  }

  function onNext() {
    setActive(false)
    nextAvailable()
  }

  return (
    <Modal
      active={active}
      full='horizontal'
      modal={false}
      position='top'
      target={target}
      title={t('TaskArea.DisabledTaskPopup.title')}
    >
      <Paragraph>
        {t('TaskArea.DisabledTaskPopup.body')}
      </Paragraph>
      <PlainButton
        alignSelf='center'
        onClick={onReset}
        text={t('TaskArea.DisabledTaskPopup.options.select')}
      />
      <PrimaryButton
        alignSelf='center'
        color='teal'
        label={t('TaskArea.DisabledTaskPopup.options.next')}
        onClick={onNext}
        margin='xsmall'
      />
      <PlainButton
        alignSelf='center'
        text={t('TaskArea.DisabledTaskPopup.options.dismiss')}
        onClick={closeModal}
      />
    </Modal>
  )
}

DisabledTaskPopup.propTypes = {
  /** open the popup on mount. */
  isOpen: bool,
  /** load the next unclassified subject */
  nextAvailable: func,
  /** callback to run when the popup closes */
  onClose: func,
  /** reset the subject store and choose a new subject */
  reset: func
}
