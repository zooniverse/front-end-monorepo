import { useState } from 'react'
import { Box, Form } from 'grommet'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { shape, string } from 'prop-types'

import EmailValidAndVerifiedStatus from '../EmailValidAndVerifiedStatus/EmailValidAndVerifiedStatus'
import FormInputField from '../FormInputField/FormInputField'
import FormStatusAndSubmitField from '../FormStatusAndSubmitField/FormStatusAndSubmitField'
import useUserData from '../../helpers/useUserData'
import updateUserData from '../../helpers/updateUserData'

const FormFieldsContainer = styled(Box)`
  gap: 1em;

  input:user-invalid {
    border-color: ${props => props.theme.global.colors['neutral-4']};
  }
`

function AccountEmailForm ({
  authUser,
}) {
  const { t } = useTranslation()
  const { data: user, isLoading, error: loadError, isValidating, mutate } = useUserData({ login: authUser?.login })
  const [ isSaving, setIsSaving ] = useState(false)  // Are we in the process of saving?
  const [ saveSuccess, setSaveSuccess ] = useState(false)  // Was the save successful?
  const [ saveMessage, setSaveMessage ] = useState('')  // Additional (non-error) information message on the save process.
  const [ saveError, setSaveError ] = useState(null)  // If the save failed, this is the error object.
  const [ hasUnsavedChanges, setHasUnsavedChanges ] = useState(false)

  // On input change, update the LOCAL data copy.
  // Changes aren't saved to Panoptes until updateUserData() is triggered.
  function onInputChange (e) {
    const value = e.target.value
    const field = e.target.dataset.field

    mutate(prevData => ({
      ...prevData,
      [field]: value
    }), {
      // DON'T revalidate. (i.e. don't overwrite local changes with data from Panoptes)
      revalidate: false
    })  

    setHasUnsavedChanges(true)
    setSaveSuccess(false)
    setSaveMessage('')
    setSaveError(null)
  }

  async function onSubmit () {

    // Sanity check
    if (isBusy) { return }
    if (!hasUnsavedChanges) {
      setSaveSuccess(false)
      setSaveMessage(t('Settings.forms.saveUnnecessary'))
      return
    }

    const email = user.email

    try {
      let shouldRevalidate = false

      await mutate(
        async (prevData) => {

          setIsSaving(true)
          setSaveSuccess(false)
          setSaveMessage('')
          setSaveError(null)

          await updateUserData({
            'email': email,
          }, authUser.id)

          setIsSaving(false)
          setSaveSuccess(true)
          setSaveMessage('')
          setSaveError(null)
          setHasUnsavedChanges(false)
          shouldRevalidate = true

          return prevData  // Return existing data with no changes.
        }, {
          // DO revalidate, IF updateUserData() is successful. (i.e. please sync local data with Panoptes) 
          revalidate: () => shouldRevalidate,

          // Optimitic data isn't required here since we're using onInputChange() to make local changes.
          // optimisticData: prevData => prevData,

          // Rollback isn't required here because this mutate doesn't use optimisticData
          // rollbackOnError: (err) => { return true }
        }
      )

    } catch (err) {
      console.error(err)
      setIsSaving(false)
      setSaveSuccess(false)
      setSaveMessage('')
      setSaveError(err?.response?.body || err)
    }
  }

  // If a FETCH or SAVE operation is ongoing, don't let other operations trigger.
  const isBusy = isLoading || isSaving
  const disableInput = isBusy || !user
  // ⚠️ Note: isBusy does NOT check for isValidating. isValidating can trigger
  // in a semi-unpredictable manner, so if we factored that in, users could
  // see the UI "stop working" randomly.

  const loadErrorMessage = loadError?.toString() || (loadError && 'Unknown error')
  const saveErrorMessage = saveError?.errors?.[0]?.message || saveError?.toString() || (saveError && 'Unknown error')
  const statusType =
    saveSuccess ? 'success'
    : (loadError || saveError) ? 'error'
    : saveMessage ? 'warning'  // TODO: this would preferably just be an 'info' type.
    : ''
  const statusMessage =
    loadError ? loadErrorMessage
    : saveSuccess ? t('Settings.forms.saveSuccess')
    : saveError ? saveErrorMessage
    : saveMessage ? saveMessage
    : ''
  
  return (
    <Form
      className='AccountEmailForm'
      onSubmit={onSubmit}
    >
      <FormFieldsContainer margin={{ vertical: 'small' }}>
        <FormInputField
          autocomplete='email'
          disabled={disableInput}
          fieldName='email'
          onInputChange={onInputChange}
          // pattern=''  // ⚠️ We're not enforcing an email pattern client-side, but instead relying on the Panoptes API. This is to avoid over-policing input, beyond setting type=email and required=true.
          required
          type='email'
          user={user}
        />

        <EmailValidAndVerifiedStatus
          user={user}
        />

        <FormStatusAndSubmitField
          showLoader={isBusy || isValidating}
          showSubmit={true}
          submitDisabled={disableInput}
          submitLabel={t('Settings.forms.change')}
          statusMessage={statusMessage}
          statusType={statusType}
          margin={{ vertical: 'small' }}
        />
      </FormFieldsContainer>
    </Form>
  )
}

AccountEmailForm.propTypes = {
  authUser: shape({
    id: string,
    login: string
  }).isRequired,
}

export default AccountEmailForm
