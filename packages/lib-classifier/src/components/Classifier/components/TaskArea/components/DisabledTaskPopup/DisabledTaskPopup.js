import { Modal, PlainButton, PrimaryButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Paragraph } from 'grommet'
import { bool, func } from 'prop-types'
import React, { useEffect, useState } from 'react'

import en from './locales/en'
counterpart.registerTranslations('en', en)

export default function DisabledTaskPopup({
  isOpen = false,
  nextAvailable,
  onClose = () => true,
  reset,
  target
}) {
  const [ active, setActive ] = useState(false)

  useEffect(function onLoaded() {
    if (isOpen) {
      setActive(true)
    }
  }, [isOpen])

  function closeModal() {
    setActive(false)
    onClose()
  }

  return (
    <Modal
      active={active}
      full='horizontal'
      modal={false}
      position='top'
      target={target}
      title={counterpart('DisabledTaskPopup.title')}
    >
      <Paragraph>
        {counterpart('DisabledTaskPopup.body')}
      </Paragraph>
      <PlainButton
        alignSelf="center"
        onClick={reset}
        text={counterpart('DisabledTaskPopup.options.select')}
      />
      <PrimaryButton
        color='teal'
        label={counterpart('DisabledTaskPopup.options.next')}
        onClick={nextAvailable}
        margin="xsmall"
      />
      <PlainButton
        alignSelf="center"
        text={counterpart('DisabledTaskPopup.options.dismiss')}
        onClick={closeModal}
      />
    </Modal>
  )
}

DisabledTaskPopup.propTypes = {
  /** open the poup on mount. */
  isOpen: bool,
  /** load the next unclassified subject */
  nextAvailable: func,
  /** callback to run when the popup closes */
  onClose: func,
  /** reset the subject store and choose a new subject */
  reset: func
}