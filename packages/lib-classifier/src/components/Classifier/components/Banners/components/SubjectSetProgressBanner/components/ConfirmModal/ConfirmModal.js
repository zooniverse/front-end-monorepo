import { Box, Button, Paragraph } from 'grommet'
import { bool, func } from 'prop-types'
import React from 'react'
import { Modal, PrimaryButton } from '@zooniverse/react-components'
import { useTranslation } from 'react-i18next'

/**
An alert which - if you've already started annotation this Subject - asks if
you really want to navigate to the Next/Previous Subject.
*/
function ConfirmModal ({
  active = false,
  /** callback to close the modal and stay on the current Subject */
  onCancel = () => true,
  /** callback to close the modal and move Next/Previous */
  onConfirm = () => true
}) {
  // NOTE: this is a functional duplicate of SubTaskPopup/components/ConfirmModal.js
  // It might be worth refactoring this into a common component.
  const { t } = useTranslation('components')
  return (
    <Modal
      active={active}
      modal
      closeFn={onCancel}
      data-testid='confirm-modal'
    >
      <Paragraph
        margin={{ bottom: 'medium' }}
      >
        {t('Banners.InProgressConfirmModal.inProgress')}
      </Paragraph>
      <Box
        direction='row'
        gap='small'
        justify='center'
      >
        <Button
          label={t('Banners.InProgressConfirmModal.cancel')}
          onClick={onCancel}
          data-testid='confirm-modal-cancel-btn'
        />
        <PrimaryButton
          label={t('Banners.InProgressConfirmModal.confirm')}
          color='teal'
          onClick={onConfirm}
          data-testid='confirm-modal-confirm-btn'
        />
      </Box>
    </Modal>
  )
}

ConfirmModal.propTypes = {
  active: bool,
  onCancel: func,
  onConfirm: func
}

export default ConfirmModal
