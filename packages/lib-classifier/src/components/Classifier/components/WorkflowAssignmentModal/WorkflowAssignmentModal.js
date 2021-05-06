import React from 'react'
import PropTypes from 'prop-types'
import { Button, Box } from 'grommet'
import { Modal, PrimaryButton } from '@zooniverse/react-components'
import en from './locales/en'
import counterpart from 'counterpart'

counterpart.registerTranslations('en', en)

export default function WorkflowAssignmentModal({ active = false }) {
  return (
    <Modal active={active} closeFn={() => {}}>
      <Box pad={{ bottom: 'xsmall' }}>{counterpart('WorkflowAssignmentModal.content')}</Box>
      <Box direction='row' gap='xsmall' justify='center'>
        <Button label={counterpart('WorkflowAssignmentModal.cancel')} />
        <PrimaryButton label={counterpart('WorkflowAssignmentModal.confirm')} />
      </Box>
    </Modal>
  )
}

WorkflowAssignmentModal.propTypes = {
  active: PropTypes.bool
}