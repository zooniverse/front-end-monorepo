import { useState } from 'react'
import { Box, Button, Form } from 'grommet'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { shape, string } from 'prop-types'

import { Loader, StatusMessage } from '@zooniverse/react-components'

import useUserMedia from '../../helpers/useUserMedia'

const FormFieldsContainer = styled(Box)`
  gap: 1em;

  input:user-invalid {
    border-color: ${props => props.theme.global.colors['neutral-4']};
  }
`

function ProfileAvatarForm ({
  authUser,
}) {
  const { t } = useTranslation()
  const { data: userAvatar, isLoading, error: loadError, isValidating } = useUserMedia({ userId: authUser?.id, mediaType: 'avatar' })
  const [ isSaving, setIsSaving ] = useState(false)
  const [ saveSuccess, setSaveSuccess ] = useState(false)
  const [ saveError, setSaveError ] = useState(null)
  const [ hasUnsavedChanges, setHasUnsavedChanges ] = useState(true)

  function onInputChange (e) {
    // TODO
  }

  async function onSubmit () {
    // TODO
    console.log('+++ ⬆️ Submit')
  }

  async function doDelete () {
    // TODO
    console.log('+++ ✖️ Delete')
  }

  const disableInput = isLoading || isValidating || isSaving
  const errorMessage = saveError?.errors?.[0]?.message || saveError?.toString() || (saveError && 'Unknown error')  // We don't worry about loading errors.
  const statusType =
    saveSuccess ? 'success'
    : saveError ? 'error'
    : ''
  const statusMessage =
    saveSuccess ? t('Settings.forms.saveSuccess')
    : saveError ? errorMessage
    : ''
  
  return (
    <Form
      className='ProfileAvatarForm'
      onSubmit={onSubmit}
    >
      <FormFieldsContainer margin={{ vertical: 'small' }}>
        
        <Box
          direction='row'
          align='center'
          justify='between'
          gap='1em'
        >
          <Box>
            {userAvatar && 
              <img src={userAvatar?.src} />
            }
          </Box>

          <Box>
            <Button onClick={doDelete}>Test Delete</Button>
          </Box>

          <Box
            flex='grow'
            direction='row'
            align='center'
          >
            <StatusMessage
              text={statusMessage}
              type={statusType}
            />
          </Box>

          {(isLoading || isValidating || isSaving) && <Loader />}

          {hasUnsavedChanges && (
            <Button
              disabled={disableInput}
              label={t('Settings.forms.save')}
              type='submit'
            />
          )}
        </Box>
      </FormFieldsContainer>
    </Form>
  )
}

ProfileAvatarForm.propTypes = {
  authUser: shape({
    id: string,
    login: string
  }).isRequired,
}

export default ProfileAvatarForm
