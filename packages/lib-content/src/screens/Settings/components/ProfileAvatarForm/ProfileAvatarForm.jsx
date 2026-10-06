import { useRef, useState } from 'react'
import { Box, Button, FileInput, Form } from 'grommet'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { shape, string } from 'prop-types'

import { Loader, StatusMessage } from '@zooniverse/react-components'

import useUserMedia from '../../helpers/useUserMedia'
import uploadUserMedia from '../../helpers/uploadUserMedia'
import deleteUserMedia from '../../helpers/deleteUserMedia'

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
  const [ isDeleting, setIsDeleting ] = useState(false)
  const [ deleteSuccess, setDeleteSuccess ] = useState(false)
  const [ deleteError, setDeleteError ] = useState(null)
  const [ hasUnsavedChanges, setHasUnsavedChanges ] = useState(true)
  const [ imageData, setImageData ] = useState(null)

  const fileInputRef = useRef()

  async function processInputFileIntoImageData (file) {
    if (!file) return

    const fileReader = new FileReader()
    fileReader.addEventListener('load', () => {
      setImageData(fileReader.result)
    })
    fileReader.readAsDataURL(file)
  }
    

  async function onInputChange (e) {
    console.log('+++ Input Change', e.target.files?.[0])

    const selectedFile = e.target.files?.[0]
    
    if (!selectedFile) {
      setImageData(null)
      return
    }

    const newImageData = processInputFileIntoImageData(selectedFile)
    setImageData(newImageData)
  }

  async function onSubmit () {
    // TODO
    console.log('+++ ⬆️ Submit')
    
    const selectedFile = fileInputRef.current?.files?.[0]
    if (!selectedFile) { return }

    try {
      setIsSaving(true)
      setSaveSuccess(false)
      setSaveError(null)

      const uploadResult = await uploadUserMedia(authUser?.id, 'avatar', selectedFile)
      if (!uploadResult) {
        throw new Error('Failed to upload user avatar')  // TODO: translations
      }

      setIsSaving(false)
      setSaveSuccess(true)
      setSaveError(null)

    } catch (err) {
      console.error(err)
      setIsSaving(false)
      setSaveSuccess(false)
      setSaveError(err?.response?.body || err)
    }

  }

  async function doDelete () {
    // TODO
    console.log('+++ ✖️ Delete')

    try {
      setIsDeleting(true)
      setDeleteSuccess(false)
      setDeleteError(null)

      const deleteResult = await deleteUserMedia(authUser?.id, 'avatar')
      if (!deleteResult) {
        throw new Error('Failed to delete user avatar')  // TODO: translations
      }

      setIsDeleting(false)
      setDeleteSuccess(true)
      setDeleteError(null)
      
    } catch (err) {
      console.error(err)
      setIsDeleting(false)
      setDeleteSuccess(false)
      setDeleteError(err?.response?.body || err)
    }

  }

  const disableInput = isLoading || isValidating || isSaving || isDeleting
  
  // We don't worry about loading errors.
  const saveErrorMessage = saveError?.errors?.[0]?.message || saveError?.toString() || (saveError && 'Unknown error')
  const deleteErrorMessage = deleteError?.errors?.[0]?.message || deleteError?.toString() || (deleteError && 'Unknown error')

  const statusType =
    (saveSuccess || deleteSuccess) ? 'success'
    : (saveError || deleteError) ? 'error'
    : ''
  const statusMessage =
    saveSuccess ? t('Settings.forms.saveSuccess')
    : saveError ? saveErrorMessage
    : deleteSuccess ? t('Settings.forms.deleteSuccess')
    : deleteError ? deleteErrorMessage
    : ''
  
  const imageSrc = imageData || userAvatar?.src
  
  return (
    <Form
      className='ProfileAvatarForm'
      onSubmit={onSubmit}
    >
      <FormFieldsContainer margin={{ vertical: 'small' }}>

        <Box
          direction='column'
        >
          <Box>
            {imageSrc
              ? <img
                  style={{ maxWidth: '200px', margin: '0 auto' }}
                  src={imageSrc}
              />
              : <p>No avatar</p>
            }
          </Box>
          
          <Box>
            <h3>Test Controls</h3>

            <FileInput
              name='avatar'
              accept='image/*'
              onChange={onInputChange}
              disabled={disableInput}
              ref={fileInputRef}
            />
            
            <Button onClick={doDelete} label='Test Delete' />
          </Box>
        </Box>
        
        <Box
          direction='row'
          align='center'
          justify='between'
          gap='1em'
        >
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

          {(isLoading || isValidating || isSaving || isDeleting) && <Loader />}

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
