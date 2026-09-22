import { useId, useRef, useState } from 'react'
import { Box, Form, Text, TextInput } from 'grommet'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Loader } from '@zooniverse/react-components'

import DarkTealPrimaryButton from '../../../Unsubscribe/components/DarkTealPrimaryButton/DarkTealPrimaryButton'
import useUserData from '../../helpers/useUserData'
import updateUserData from '../../helpers/updateUserData'

const FormFieldsContainer = styled(Box)`
  gap: 1em;

  input:user-invalid {
    border-color: ${props => props.theme.global.colors['neutral-4']};
  }
`

const InputFieldContainer = styled(Box)`
  gap: 0.5em;
`

const BigLabel = styled(Text)`
  font-weight: 700;
  font-style: bold;
  text-transform: uppercase;
`

async function DEFAULT_FUNCTION () {}

export default function AccountNameForm ({
  authUser,
}) {
  const { data: user, isLoading, error: loadError, isValidating, mutate } = useUserData({ login: authUser.login })
  const [ isSaving, setIsSaving ] = useState(false)
  const [ saveSuccess, setSaveSuccess ] = useState(false)
  const [ saveError, setSaveError ] = useState(null)
  const [ hasUnsavedChanges, setHasUnsavedChanges ] = useState(false)

  if (!user) return null

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
  }

  async function onSubmit () {

    // TODO: validate input.
    // Fun fact: did you know that display_name and credited_name can both accept emojis?
    // credited_name can be empty, but not display_name.
    const displayName = user.display_name
    const creditedName = user.credited_name

    try {
      let shouldRevalidate = false

      await mutate(
        async (prevData) => {

          setIsSaving(true)
          setSaveSuccess(false)
          setSaveError(null)

          await updateUserData({
            ['credited_name']: creditedName,
            ['display_name']: displayName
          }, authUser.id)

          setIsSaving(false)
          setSaveSuccess(true)
          setSaveError(null)
          shouldRevalidate = true

          return prevData  // Return existing data with no changes.
        }, {
          // DO revalidate, IF updateUserData() is successful. (i.e. please sync local data with Panoptes) 
          revalidate: () => shouldRevalidate,

          // Optimitic data isn't required here since we're using onInputChange() to make local changes.
          // optimisticData: prevData => prevData,

          // Rollback isn't required here because this mutate doesn't make any changes.
          // rollbackOnError: (err) => { return true }
        }
      )

    } catch (err) {
      console.error(err)
      setIsSaving(false)
      setSaveSuccess(false)
      setSaveError(err?.response?.body || err)
    }
  }

  const disableInput = isLoading || isValidating || isSaving

  return (
    <Form
      className='AccountNameForm'
      onSubmit={onSubmit}
    >
      <FormFieldsContainer margin={{ vertical: 'small' }}>
        <FormInputField
          onInputChange={onInputChange}
          fieldName='display_name'
          user={user}
        />
        <FormInputField
          onInputChange={onInputChange}
          fieldName='credited_name'
          user={user}
          optional
        />
        <Box
          direction='row'
        >
          {hasUnsavedChanges ? (
            <DarkTealPrimaryButton
              disabled={disableInput}
              label={'TODO: SAVE'}
              type='submit'
            /> ) : (
            <Text>No unsaved changes</Text>
          )}

          {(isLoading || isValidating || isSaving) && <Loader />}

          {saveSuccess && '✅'}

          {saveError?.errors?.[0]?.message || saveError?.toString() || (saveError && 'Unknown error')}
        </Box>
      </FormFieldsContainer>
    </Form>
  )
}

function FormInputField ({
  onInputChange = DEFAULT_FUNCTION,
  fieldName = '',
  user,
  optional = false,
}) {
  const { t } = useTranslation()
  const inputId = useId()
  const inputRef = useRef()

  const labelText = t(`Settings.forms.fields.${fieldName}.label`) || ''
  const helpText = t(`Settings.forms.fields.${fieldName}.help`) || ''

  return (
    <InputFieldContainer>
      <Box direction='row' gap='1em' align='center'>
        <BigLabel
          as='label'
          htmlFor={inputId}
        >
          {labelText}
        </BigLabel>
        {optional &&
          <Text>{t('Settings.forms.optional')}</Text>
        }
      </Box>
      <TextInput
        id={inputId}
        name={fieldName}
        ref={inputRef}
        data-field={fieldName}
        value={user?.[fieldName] || ''}
        onChange={onInputChange}
      />
      
      <Text>{helpText}</Text>
    </InputFieldContainer>
  )
}