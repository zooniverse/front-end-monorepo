import counterpart from 'counterpart'
import { Box, Button, Paragraph } from 'grommet'
import { func } from 'prop-types'
import React from 'react'
import { Modal, PrimaryButton } from '@zooniverse/react-components'

import en from '../locales/en'

counterpart.registerTranslations('en', en)

/**
An alert which - if you've already started annotation this Subject - asks if
you really want to navigate to the Next/Previous Subject.
*/
function ConfirmModal ({
  /** callback to close the modal and stay on the current Subject */
  onCancel = () => true,
  /** callback to close the modal and move Next/Previous */
  onConfirm = () => true
}) {
  // NOTE: this is a functional duplicate of SubTaskPopup/components/ConfirmModal.js
  // It might be worth refactoring this into a common component.
  return (
    <Modal
      active
      modal={true}
    >
      <Paragraph
        margin={{ bottom: 'medium' }}
      >
        {counterpart('InProgressConfirmModal.inProgress')}
      </Paragraph>
      <Box
        direction='row'
        gap='small'
        justify='center'
      >
        <Button
          label={counterpart('InProgressConfirmModal.cancel')}
          onClick={onCancel}
        />
        <PrimaryButton
          label={counterpart('InProgressConfirmModal.confirm')}
          color='teal'
          onClick={onConfirm}
        />
      </Box>
    </Modal>
  )
}

ConfirmModal.propTypes = {
  onCancel: func,
  onConfirm: func
}

export default ConfirmModal
