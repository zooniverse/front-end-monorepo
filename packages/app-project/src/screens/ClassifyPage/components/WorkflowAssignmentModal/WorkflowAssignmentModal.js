import React from 'react'
import PropTypes from 'prop-types'
import { Button, Box, CheckBox } from 'grommet'
import { Modal, PrimaryButton, SpacedText } from '@zooniverse/react-components'
import en from './locales/en'
import counterpart from 'counterpart'

counterpart.registerTranslations('en', en)

export default function WorkflowAssignmentModal(props) {
  const { active = false, closeFn, dismiss, dismissedForSession = false } = props
  return (
    <Modal active={active} closeFn={closeFn} title={counterpart('WorkflowAssignmentModal.title')}>
      <Box pad={{ bottom: 'xsmall' }}>{counterpart('WorkflowAssignmentModal.content')}</Box>
      <Box pad={{ bottom: 'xsmall' }}>
        <CheckBox
          checked={dismissedForSession}
          label={<SpacedText>{counterpart('WorkflowAssignmentModal.dismiss')}</SpacedText>}
          onChange={(event) => dismiss(event)}
        />
      </Box>
      <Box direction='row' gap='xsmall' justify='center'>
        <Button label={counterpart('WorkflowAssignmentModal.cancel')} onClick={() => closeFn()} />
        <PrimaryButton label={counterpart('WorkflowAssignmentModal.confirm')} />
      </Box>
    </Modal>
  )
}

WorkflowAssignmentModal.propTypes = {
  active: PropTypes.bool,
  closeFn: PropTypes.func.isRequired,
  dismiss: PropTypes.func.isRequired,
  dismissedForSession: PropTypes.bool
}