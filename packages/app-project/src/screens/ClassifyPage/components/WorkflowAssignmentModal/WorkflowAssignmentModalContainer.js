import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { MobXProviderContext, observer } from 'mobx-react'
import { Button, Box, CheckBox, Text } from 'grommet'
import { Modal, PrimaryButton, SpacedText } from '@zooniverse/react-components'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'

import NavLink from '@shared/components/NavLink'

const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const DEFAULT_HANDLER = () => false

function useStore() {
  const { store } = useContext(MobXProviderContext)

  return {
    /** assignedWorkflowID is fetched every 5 classifications per user session */
    assignedWorkflowID: store.user.personalization.projectPreferences.settings?.workflow_id,
    /** This function determines if the user has an assigned workflow and verifies that workflow is active in panoptes */
    promptAssignment: store.user.personalization.projectPreferences.promptAssignment
  }
}

function WorkflowAssignmentModalContainer({ currentWorkflowID = '' }) {
  const { assignedWorkflowID = '', promptAssignment } = useStore()

  const { t } = useTranslation('screens')
  const router = useRouter()
  const owner = router?.query?.owner
  const project = router?.query?.project
  const url = `/${owner}/${project}/classify/workflow/${assignedWorkflowID}`

  /** Active state of the Modal */
  const [active, setActive] = useState(false)
  /** State synced with sessionStorage */
  const [dismissedForSession, setDismissedForSession] = useState(false)
  /** Visual/aria checkbox state */
  const [checkboxChecked, setCheckboxChecked] = useState(false)

  useEffect(function checkForDismissal() {
    if (window.sessionStorage.getItem('workflowAssignmentModalDismissed')) {
        setDismissedForSession(true)
      } else {
        setDismissedForSession(false)
      }
  }, [])

  useEffect(function modalVisibility() {
      const showPrompt = promptAssignment(currentWorkflowID)
      console.log('SHOW PROMPT', showPrompt)

      if (showPrompt && !dismissedForSession) {
        setActive(true)
      } else {
        setActive(false)
      }
    },
    [assignedWorkflowID, dismissedForSession]
  )

  function handleChange(event) {
    // if checkbox is unchecked
    window.sessionStorage.removeItem('workflowAssignmentModalDismissed')
    setCheckboxChecked(false)

    // if checkbox is checked
    window.sessionStorage.setItem('workflowAssignmentModalDismissed', 'true')
    setCheckboxChecked(true)
  }

  function closeFn() {
    setActive(false)
  }

  return (
    <Modal active={active} closeFn={closeFn} title={t('Classify.WorkflowAssignmentModal.title')}>
      <Box pad={{ bottom: 'xsmall' }}>{t('Classify.WorkflowAssignmentModal.content')}</Box>
      <Box pad={{ bottom: 'xsmall' }}>
        <CheckBox
          checked={checkboxChecked}
          label={<SpacedText>{t('Classify.WorkflowAssignmentModal.dismiss')}</SpacedText>}
          onChange={handleChange}
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

WorkflowAssignmentModalContainer.propTypes = {
  currentWorkflowID: PropTypes.string
}

export default observer(WorkflowAssignmentModalContainer)
