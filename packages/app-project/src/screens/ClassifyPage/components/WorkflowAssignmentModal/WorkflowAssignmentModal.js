import PropTypes from 'prop-types'
import { Button, Box, CheckBox, Text } from 'grommet'
import { Modal, PrimaryButton, SpacedText } from '@zooniverse/react-components'
import { useRouter } from 'next/router'
import counterpart from 'counterpart'

import NavLink from '@shared/components/NavLink'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export default function WorkflowAssignmentModal(props) {
  const { active = false, assignedWorkflowID, closeFn, dismiss, dismissedForSession = false } = props
  const router = useRouter()
  const { owner, project } = router?.query || {}

  const url = `/${owner}/${project}/classify/workflow/${assignedWorkflowID}`

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
        <NavLink
          StyledAnchor={PrimaryButton}
          StyledSpacedText={Text}
          link={{ href: url, text: counterpart('WorkflowAssignmentModal.confirm')}}
        />
      </Box>
    </Modal>
  )
}

WorkflowAssignmentModal.propTypes = {
  active: PropTypes.bool,
  assignedWorkflowID: PropTypes.string.isRequired,
  closeFn: PropTypes.func.isRequired,
  dismiss: PropTypes.func.isRequired,
  dismissedForSession: PropTypes.bool
}