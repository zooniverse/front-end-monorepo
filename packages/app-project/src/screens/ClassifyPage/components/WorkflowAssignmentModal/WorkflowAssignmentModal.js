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

function useStore() {
  const { store } = useContext(MobXProviderContext)

  return {
    /** assignedWorkflowID is fetched every 5 classifications per user session */
    assignedWorkflowID: store.user.personalization.projectPreferences.settings?.workflow_id,
    /** This function determines if the user has an assigned workflow and verifies that workflow is active in panoptes */
    promptAssignment: store.user.personalization.projectPreferences.promptAssignment,
  }
}

function WorkflowAssignmentModal({ currentWorkflowID = '' }) {
  const { assignedWorkflowID, promptAssignment } = useStore()

  const { t } = useTranslation('screens')
  const router = useRouter()
  const owner = router?.query?.owner
  const project = router?.query?.project
  const url = `/projects/${owner}/${project}/classify/workflow/${assignedWorkflowID}`

  /** Check if user has dismissed the modal, but only in the browser */
  const isBrowser = typeof window !== 'undefined'
  const storedDismissedForSession = isBrowser ? window.sessionStorage.getItem('workflowAssignmentModalDismissed') : false

  /** Modal active state*/
  const [active, setActive] = useState(false)

  /** The useEffect below observes dismissedForSession rather than storedDismissedForSession
   * to give the user a chance to uncheck the checkbox before modal closes */
  const [dismissedForSession, setDismissedForSession] = useState(storedDismissedForSession)

  /** Visual/aria checkbox state */
  const [checkboxChecked, setCheckboxChecked] = useState(false)

  useEffect(
    function modalVisibility() {
      const showPrompt = promptAssignment(currentWorkflowID)

      const isActive = (showPrompt && !dismissedForSession)
      setActive(isActive)
    },
    [assignedWorkflowID, currentWorkflowID, dismissedForSession, promptAssignment]
  )

  function handleChange(event) {
    if (event.target.checked) {
      window.sessionStorage.setItem('workflowAssignmentModalDismissed', 'true')
      setCheckboxChecked(true)
    } else {
      window.sessionStorage.removeItem('workflowAssignmentModalDismissed')
      setCheckboxChecked(false)
    }
  }

  function closeFn() {
    setActive(false)
  }

  return (
    <Modal
      active={active}
      closeFn={closeFn}
      title={t('Classify.WorkflowAssignmentModal.title')}
    >
      <Box pad={{ bottom: 'xsmall' }}>
        {t('Classify.WorkflowAssignmentModal.content')}
      </Box>
      <Box pad={{ bottom: 'xsmall' }}>
        <CheckBox
          checked={checkboxChecked}
          label={
            <SpacedText>
              {t('Classify.WorkflowAssignmentModal.dismiss')}
            </SpacedText>
          }
          onChange={handleChange}
        />
      </Box>
      <Box direction='row' gap='xsmall' justify='center'>
        <Button
          label={t('Classify.WorkflowAssignmentModal.cancel')}
          onClick={() => closeFn()}
        />
        <StyledNavLink
          StyledAnchor={PrimaryButton}
          StyledSpacedText={Text}
          link={{
            href: url,
            text: t('Classify.WorkflowAssignmentModal.confirm'),
          }}
        />
      </Box>
    </Modal>
  )
}

WorkflowAssignmentModal.propTypes = {
  currentWorkflowID: PropTypes.string
}

export default observer(WorkflowAssignmentModal)
