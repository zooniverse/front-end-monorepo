import counterpart from 'counterpart'
import { Box, Button, Paragraph } from 'grommet'
import { func } from 'prop-types'
import React from 'react'
import { Modal, PrimaryButton } from '@zooniverse/react-components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

/**
 An alert which confirms 'keep working' or 'delete' for incomplete annotations. Incomplete annotations must be either completed or deleted.
*/
function ConfirmModal ({
  /** callback to close the modal and keep working. */
  onClose = () => true,
  /** callback to close the modal and delete the active mark. */
  onDelete = () => true
}) {
  return (
    <Modal
      active
      modal={false}
    >
      <Paragraph
        margin={{ bottom: 'medium' }}
      >
        {counterpart('Confirm.confirm')}
      </Paragraph>
      <Box
        direction='row'
        gap='small'
        justify='center'
      >
        <Button
          label={counterpart('Confirm.keepWorking')}
          onClick={onClose}
        />
        <PrimaryButton
          label={counterpart('Confirm.close')}
          color='teal'
          onClick={onDelete}
        />
      </Box>
    </Modal>
  )
}

ConfirmModal.propTypes = {
  onClose: func,
  onDelete: func
}

export default ConfirmModal
