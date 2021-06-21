import { Modal, PlainButton, PrimaryButton } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Paragraph } from 'grommet'
import React, { useEffect, useState } from 'react'

import en from './locales/en'
counterpart.registerTranslations('en', en)

export default function DisabledTaskPopup({
  isOpen = false,
  onClose = () => true,
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
        text={counterpart('DisabledTaskPopup.options.select')}
      />
      <PrimaryButton
        color='teal'
        label={counterpart('DisabledTaskPopup.options.next')}
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