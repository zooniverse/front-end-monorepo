import { useState } from 'react'
import { Box, Form } from 'grommet'
import styled from 'styled-components'
import { shape, string } from 'prop-types'

import BigLabel from '../BigLabel/BigLabel'
import FormCheckboxField from '../FormCheckboxField/FormCheckboxField'
import FormStatusAndSubmitField from '../FormStatusAndSubmitField/FormStatusAndSubmitField'
import useUserData from '../../helpers/useUserData'
import updateUserData from '../../helpers/updateUserData'

const FormFieldsContainer = styled(Box)`
  gap: 1em;

  input:user-invalid {
    border-color: ${props => props.theme.global.colors['neutral-4']};
  }
`

function ZooniverseEmailPreferenceForm ({
  authUser,
  heading = 'TESTING',
  fields = [
    'global_email_communication',
    'beta_email_communication',
    'nasa_email_communication',
  ],
  ...rest
}) {
  const { data: user, isLoading, error: loadError, isValidating, mutate } = useUserData({ login: authUser?.login })
  const [ saveError, setSaveError ] = useState(null)  // If the save failed, this is the error object.
  // ⚠️ Note that saveError is NEVER cleared, because multiple save operations
  // can occur at the same time and we don't know which will finish first.

  // On input change, update the LOCAL data copy.
  // Changes aren't saved to Panoptes until updateUserData() is triggered.
  async function onInputChange (e) {
    const value = e.target.checked
    const field = e.target.dataset.field

    await mutate(
      async (prevData) => {
        const nextData = structuredClone(prevData)

        // For some reason, nextData?.[field] isn't enabled at time of writing?? 🤨
        nextData && (nextData[field] = value)

        // Don't await
        updateUserData({
          [field]: !!value
        }, authUser.id)
        .catch(err => {
          console.error(err)
          setSaveError(err?.response?.body || err)

          mutate() // mutate() with no arguments revalidates and restores the UI to match the server state.
        })

        return nextData
      }
    , {
      revalidate: false
    })
  }

  // "Is ready" means we have sufficient data to show the form input. We don't
  // check for isValidating, because that that would make the form input
  // disappear every time we validate.
  const isReady = !isLoading && !loadError

  // If a FETCH operation is ongoing, show the Loader. That's all.
  const isBusy = isLoading || isValidating
  const disableInput = isBusy || !user

  const loadErrorMessage = loadError?.toString() || (loadError && 'Unknown error')
  const saveErrorMessage = saveError?.errors?.[0]?.message || saveError?.toString() || (saveError && 'Unknown error')
  const statusType =
    (loadError || saveError) ? 'error'
    : ''
  const statusMessage =
    loadError ? loadErrorMessage
    : saveError ? saveErrorMessage
    : ''
  
  return (
    <Form
      className='ZooniverseEmailPreferenceForm'
      {...rest}
    >
      <FormFieldsContainer margin={{ vertical: 'small' }}>
        {heading && (
          <BigLabel as="h2">
            {heading}
          </BigLabel>
        )}

        {isReady && fields.map(fieldName => (
          <FormCheckboxField
            key={fieldName}
            disabled={disableInput}
            fieldName={fieldName}
            onInputChange={onInputChange}
            user={user}
          />
        ))}

        <FormStatusAndSubmitField
          showLoader={isBusy}
          showSubmit={false}
          statusMessage={statusMessage}
          statusType={statusType}
        />
      </FormFieldsContainer>
    </Form>
  )
}

ZooniverseEmailPreferenceForm.propTypes = {
  authUser: shape({
    id: string,
    login: string
  }).isRequired,
}

export default ZooniverseEmailPreferenceForm
