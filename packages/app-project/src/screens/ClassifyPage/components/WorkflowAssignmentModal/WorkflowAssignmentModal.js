import PropTypes from 'prop-types'
import { Button, Box, CheckBox, Text } from 'grommet'
import { Modal, PrimaryButton, SpacedText } from '@zooniverse/react-components'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { useState } from 'react'

import NavLink from '@shared/components/NavLink'

const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function WorkflowAssignmentModal({
  active = false,
  assignedWorkflowID,
  closeFn,
  dismiss,
  router
}) {
  const { t } = useTranslation('screens')
  const nextRouter = useRouter()
  router = router || nextRouter
  const owner = router?.query?.owner
  const project = router?.query?.project

  const url = `/${owner}/${project}/classify/workflow/${assignedWorkflowID}`

  const [checkboxChecked, setCheckboxChecked] = useState(false)

  const handleDismiss = (event) => {
    dismiss(event)
    setCheckboxChecked(true)
  }

  return (
    <Modal active={active} closeFn={closeFn} title={t('Classify.WorkflowAssignmentModal.title')}>
      <Box pad={{ bottom: 'xsmall' }}>{t('Classify.WorkflowAssignmentModal.content')}</Box>
      <Box pad={{ bottom: 'xsmall' }}>
        <CheckBox
          checked={checkboxChecked}
          label={<SpacedText>{t('Classify.WorkflowAssignmentModal.dismiss')}</SpacedText>}
          onChange={(event) => handleDismiss(event)}
        />
      </Box>
      <Box direction='row' gap='xsmall' justify='center'>
        <Button label={t('Classify.WorkflowAssignmentModal.cancel')} onClick={() => closeFn()} />
        <StyledNavLink
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
  onDismiss: PropTypes.func.isRequired,
  dismissedForSession: PropTypes.bool,
  /** 
    Optional custom router. Overrides the default NextJS.
    Useful for mocking the router in stories and shallow tests.
  */
  router: PropTypes.shape({
    query: PropTypes.shape({
      owner: PropTypes.string,
      project: PropTypes.string
    })
  })
}
