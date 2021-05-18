import counterpart from 'counterpart'
import { Box, Button, Paragraph } from 'grommet'
import { func } from 'prop-types'
import React from 'react'
import { Modal, PrimaryButton } from '@zooniverse/react-components'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function ConfirmModal ({ onClose, onDelete }) {
  return (
    <Modal
      active
      closeFn={onClose}
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

ConfirmModal.defaultProps = {
  onClose: () => {},
  onDelete: () => {}
}

export default ConfirmModal
