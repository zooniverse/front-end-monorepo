import { useRef, useState } from 'react'
import { Box, Button, FileInput, Form } from 'grommet'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { shape, string } from 'prop-types'

import { Loader, StatusMessage } from '@zooniverse/react-components'

import useUserMedia from '../../helpers/useUserMedia'
import uploadUserMedia from '../../helpers/uploadUserMedia'
import deleteUserMedia from '../../helpers/deleteUserMedia'
import readImageFile from '../../helpers/readImageFile'
import resizeImageData from '../../helpers/resizeImageData'

const FormFieldsContainer = styled(Box)`
  gap: 1em;

  input:user-invalid {
    border-color: ${props => props.theme.global.colors['neutral-4']};
  }
`

function ProfileAvatarForm ({
  authUser,
  maxDataSize = 60000,
  optionalRatio = 1,
}) {
  const { t } = useTranslation()
  const { data: userAvatar, isLoading, error: loadError, isValidating, mutate } = useUserMedia({ userId: authUser?.id, mediaType: 'avatar' })
  const [ isSaving, setIsSaving ] = useState(false)
  const [ saveSuccess, setSaveSuccess ] = useState(false)
  const [ saveError, setSaveError ] = useState(null)
  const [ isDeleting, setIsDeleting ] = useState(false)
  const [ deleteSuccess, setDeleteSuccess ] = useState(false)
  const [ deleteError, setDeleteError ] = useState(null)
  const [ imageData, setImageData ] = useState(null)  // This is the Data URL string that will be used to edit and preview the image client-side. 
  const [ imageBlob, setImageBlob ] = useState(null)  // This is the "File" that will be uploaded to Panoptes.

  const fileInputRef = useRef()
  
  // When the File input changes, we'll do the following:
  // 1. read the selected image file as a Data URL string (image data).
  // 2. resize the image data to an acceptable file size range (and optionally,
  //    the image will be cropped to meet a specific aspect ratio).
  // 3. show the modified image data as a preview.
  // After that, the user has to click the Submit button to save changes.

  async function onInputChange (e) {
    const selectedFile = e.target.files?.[0]
    
    if (!selectedFile) {
      setImageData(null)
      setImageBlob(null)
      return
    }

    try {
      setIsSaving(true)
      setSaveError(null)  // SaveError is pulling double duty here.
      setImageData(null)
      setImageBlob(null)

      const newImageData = await readImageFile(selectedFile)
      const {
        string: resizedImageData,
        blob: resizedImageBlob
      } = await resizeImageData(newImageData, maxDataSize, optionalRatio)

      setIsSaving(false)
      setSaveError(null)
      setImageData(resizedImageData)
      setImageBlob(resizedImageBlob)

    } catch (err) {
      console.error(err)

      setIsSaving(false)
      setSaveError(err)
      setImageData(null)
      setImageBlob(null)
    }
  }

  async function onSubmit () {    
    const selectedFile = imageBlob
    if (!selectedFile) { return }

    try {
      let shouldRevalidate = false

      await mutate(
        async (prevData) => {
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

          // Clear the temporary input file on successful upload.
          setImageData(null)
          setImageBlob(null)
          shouldRevalidate = true

          return prevData  // Return existing data with no changes.
        }, {
          // DO revalidate, IF uploadUserMedia() is successful. (i.e. please sync local data with Panoptes) 
          revalidate: () => shouldRevalidate
        }
      )
    } catch (err) {
      console.error(err)
      setIsSaving(false)
      setSaveSuccess(false)
      setSaveError(err?.response?.body || err)
    }
  }

  async function doDelete () {
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
            
            {userAvatar && !imageData && (
              <Button onClick={doDelete} label='Test Delete' />
            )}
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

          {imageData && (
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
