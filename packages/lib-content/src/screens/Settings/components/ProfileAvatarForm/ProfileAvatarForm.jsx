import { useId, useRef, useState } from 'react'
import { Box, Button, FileInput, Form, Text } from 'grommet'
import { AddCircle as AddIcon } from 'grommet-icons'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
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

// The File Input Container 
// - If the custom hasMedia property is true, it means the container has a
//   preview image - either an existing user media asset, or a newly uploaded
//   one that needs to be saved.
// - Otherwise, the container will be a grey square or rectangle awaiting input. 
const FileInputContainer = styled(Box)`

`

const PreviewImage = styled('img')`
  ${props => css`
    width: ${props.width};
    height: ${props.height};
  `}
  object-fit: cover;
  object-position: center;
`

// An invisible file input that that appears _in front_ another element (e.g.
// an image). Requires a parent element with position=relative, a "background"
// element, and explicit width & height shared by all three elements.
// Usage:
// <div style={{ position: 'relative'; width: '100px'; height: '100px' }}>
//   <img style={{ width: '100px'; height: '100px' }} />
//   <InvisibleFileInput width='100px' height='100px' />
// </div>
const InvisibleFileInput = styled('input')`
  position: absolute;
  top: 0;
  left: 0;
  ${props => css`
    width: ${props.width};
    height: ${props.height};
  `}
  background: transparent;
  border: none;

  &::file-selector-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: transparent;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`

function ProfileAvatarForm ({
  authUser,
  maxDataSize = 60000,
  mediaType = 'avatar',
  optionalRatio = 1,
  labels = {
    previewImage: '',  // TODO: ensure the parent calling this specifies the appropriate labels
  }  
}) {
  const { t } = useTranslation()
  const { data: currentUserMedia, isLoading, error: loadError, isValidating, mutate } = useUserMedia({ userId: authUser?.id, mediaType: mediaType })
  const [ isSaving, setIsSaving ] = useState(false)
  const [ saveSuccess, setSaveSuccess ] = useState(false)
  const [ saveMessage, setSaveMessage ] = useState('')  // Additional (non-error) information message on the save process.
  const [ saveError, setSaveError ] = useState(null)
  const [ isDeleting, setIsDeleting ] = useState(false)
  const [ deleteSuccess, setDeleteSuccess ] = useState(false)
  const [ deleteError, setDeleteError ] = useState(null)
  const [ imageData, setImageData ] = useState(null)  // This is the Data URL string that will be used to edit and preview the image client-side. 
  const [ imageBlob, setImageBlob ] = useState(null)  // This is the "File" that will be uploaded to Panoptes.

  const fileInputRef = useRef()
  const fileInputId = useId()
  
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
      setSaveSuccess(false)
      setSaveMessage('')
      setSaveError(null)  // SaveError is pulling double duty here.
      setImageData(null)
      setImageBlob(null)

      const newImageData = await readImageFile(selectedFile)
      const {
        string: resizedImageData,
        blob: resizedImageBlob
      } = await resizeImageData(newImageData, maxDataSize, optionalRatio)

      setIsSaving(false)
      setSaveSuccess(false)
      setSaveMessage(t('Settings.forms.saveReminder'))
      setSaveError(null)
      setImageData(resizedImageData)
      setImageBlob(resizedImageBlob)

    } catch (err) {
      console.error(err)

      setIsSaving(false)
      setSaveSuccess(false)
      setSaveMessage('')
      setSaveError(err)
      setImageData(null)
      setImageBlob(null)
    }
  }

  async function onSubmit () {    
    const selectedFile = imageBlob

    // Sanity check
    if (isSaving || isDeleting) { return }
    if (!selectedFile) {
      setSaveSuccess(false)
      setSaveMessage('')
      setSaveMessage(t('Settings.forms.saveUnnecessary'))
      return
    }

    try {
      let shouldRevalidate = false

      await mutate(
        async (prevData) => {
          setIsSaving(true)
          setSaveSuccess(false)
          setSaveMessage('')
          setSaveError(null)

          const uploadResult = await uploadUserMedia(authUser?.id, mediaType, selectedFile)
          if (!uploadResult) {
            throw new Error(`Failed to upload user ${mediaType}`)  // TODO: translations
          }

          setIsSaving(false)
          setSaveSuccess(true)
          setSaveMessage('')
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
      setSaveMessage('')
      setSaveError(err?.response?.body || err)
    }
  }

  async function doDelete () {
    // Sanity check
    if (isSaving || isDeleting) { return }

    try {
      let shouldRevalidate = false

      await mutate(
        async (prevData) => {
          setIsDeleting(true)
          setDeleteSuccess(false)
          setDeleteError(null)

          setSaveSuccess(false)
          setSaveMessage('')
          setSaveError(null)

          const deleteResult = await deleteUserMedia(authUser?.id, mediaType)
          if (!deleteResult) {
            throw new Error(`Failed to delete user ${mediaType}`)  // TODO: translations
          }

          setIsDeleting(false)
          setDeleteSuccess(true)
          setDeleteError(null)

          // Clear any temporary input file on successful upload, just in case.
          setImageData(null)
          setImageBlob(null)
          shouldRevalidate = true

          return prevData  // Return existing data with no changes.
        }, {
          // DO revalidate, IF deleteUserMedia() is successful. (i.e. please sync local data with Panoptes) 
          revalidate: () => shouldRevalidate
        }
      )
      
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
    : saveMessage ? 'warning'  // TODO: this would preferably just be an 'info' type.
    : ''
  const statusMessage =
    saveSuccess ? t('Settings.forms.saveSuccess')
    : saveError ? saveErrorMessage
    : saveMessage ? saveMessage
    : deleteSuccess ? t('Settings.forms.deleteSuccess')
    : deleteError ? deleteErrorMessage
    : ''
  
  const imageSrc = imageData || currentUserMedia?.src

  const width = '128px'
  const height = '128px'
  
  return (
    <Form
      className='ProfileAvatarForm'
      onSubmit={onSubmit}
    >
      <FormFieldsContainer margin={{ vertical: 'small' }}>

        <Box direction='column'>

          <FileInputContainer
            style={{
              border: '0.5px solid #A6A7A9',
              borderRadius: '4px',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(239, 242, 245, 0.40) 100%), rgba(255, 255, 255, 0.20)',
              boxShadow: '1px 1px 4px 0 rgba(0, 0, 0, 0.25) inset',
              position: 'relative'
            }}
            width={width}
            height={height}
          >

            {imageSrc ? (
              <PreviewImage
                role="img"
                alt={labels?.previewImage}
                src={imageSrc}
              />
            ):(
              <Box
                width={width}
                height={height}
                align='center'
                justify='center'
              >
                <AddIcon color='brand' size='large' />
                <Text
                  as='label'
                  textAlign='center'
                  width={{ max: '85%' }}
                  htmlFor={fileInputId}
                >
                  {t('Settings.forms.selectImage')}
                </Text>
              </Box>
            )}

            <InvisibleFileInput
              id={fileInputId}
              name={mediaType}
              accept='image/*'
              onChange={onInputChange}
              disabled={disableInput}
              ref={fileInputRef}
              width={width}
              height={height}
              type='file'
            />
            
          </FileInputContainer>

          <Box
            direction='row'
            align='center'
            justify='between'
            gap='1em'
          >
            <Button
              disabled={disableInput}
              label={t('Settings.forms.save')}
              type='submit'
            />

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
          </Box>
        
          <Box>
            <h3>Test Controls</h3>
            
            
            <Button onClick={doDelete} label='Test Delete' />
          </Box>
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
