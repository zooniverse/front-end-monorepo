import PropTypes from 'prop-types'
import { Button, Box, CheckBox, Text } from 'grommet'
import { Modal, PrimaryButton, SpacedText } from '@zooniverse/react-components'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import NavLink from '@shared/components/NavLink'

export default function WorkflowAssignmentModal({
  active = false,
  assignedWorkflowID,
  closeFn,
  dismiss,
  dismissedForSession = false,
  router
}) {
  const { t } = useTranslation('screens')
  const nextRouter = useRouter()
  router = router || nextRouter
  const owner = router?.query?.owner
  const project = router?.query?.project

  const url = `/${owner}/${project}/classify/workflow/${assignedWorkflowID}`

  return (
    <Modal active={active} closeFn={closeFn} title={t('Classify.WorkflowAssignmentModal.title')}>
      <Box pad={{ bottom: 'xsmall' }}>{t('Classify.WorkflowAssignmentModal.content')}</Box>
      <Box pad={{ bottom: 'xsmall' }}>
        <CheckBox
          checked={dismissedForSession}
          label={<SpacedText>{t('Classify.WorkflowAssignmentModal.dismiss')}</SpacedText>}
          onChange={(event) => dismiss(event)}
        />
      </Box>
      <Box direction='row' gap='xsmall' justify='center'>
        <Button label={t('Classify.WorkflowAssignmentModal.cancel')} onClick={() => closeFn()} />
        <NavLink
          StyledAnchor={PrimaryButton}
          StyledSpacedText={Text}
          link={{ href: url, text: t('Classify.WorkflowAssignmentModal.confirm') }}
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
