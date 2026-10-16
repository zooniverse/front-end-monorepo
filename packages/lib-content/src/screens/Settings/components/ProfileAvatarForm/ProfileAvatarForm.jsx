import { useId, useRef, useState } from 'react'
import { Box, Button, Form, Text } from 'grommet'
import { AddCircle as AddIcon, Trash as TrashIcon } from 'grommet-icons'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { shape, string } from 'prop-types'

import { Loader, StatusMessage } from '@zooniverse/react-components'
import { IconActionButton } from '@zooniverse/react-components'

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
  position: relative;
`

const ContainerBackgroundWhenThereIsNoPreviewImage = styled(Box)`
  border: 0.5px solid #A6A7A9;
  border-radius: 4px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(239, 242, 245, 0.40) 100%), rgba(255, 255, 255, 0.20);
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.25) inset;
`

const PreviewImage = styled('img')`
  ${props => css`
    width: ${props.width};
    height: ${props.height};
  `}
  object-fit: cover;
  object-position: center;
  ${props => props.circular === 'true'
    ? 'border-radius: 50%;'
    : ''
  }
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

// A delete button that appears _in front_ of the invisible file input.
// Does not change colour in light/dark mode.
const DeleteButton = styled(IconActionButton)`
  position: absolute;
  top: 0;
  right: 0;

  background-color: ${props => props.theme.global.colors['neutral-6']};
  filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25));
  backdrop-filter: blur(2px);

  > svg {
    fill: ${props => props.theme.global.colors['neutral-4']};
    stroke: ${props => props.theme.global.colors['neutral-4']};
  }
`

function ProfileAvatarForm ({
  authUser,
  maxDataSize = 60000,
  mediaType = 'avatar',
  optionalRatio = 1,
  labels = {
    previewImage: '',  // TODO: ensure the parent calling this specifies the appropriate labels
  },
  width = '128px',
  height = '128px',
  makePreviewImageCircular = true,
}) {
  const { t } = useTranslation()
  const { data: currentUserMedia, isLoading, error: loadError, isValidating, mutate } = useUserMedia({ userId: authUser?.id, mediaType: mediaType })
  const [ isSelecting, setIsSelecting ] = useState(false) // true when user is selecting an image to upload, but hasn't submitted.
  const [ selectionMessage, setSelectionMessage ] = useState('')  // Additional (non-error) information message when selecting (or clearing) an image to upload.
  const [ isSaving, setIsSaving ] = useState(false)  // true when user has already selected an image, and just pressed the "Save"/submit button.
  const [ saveSuccess, setSaveSuccess ] = useState(false)
  const [ saveError, setSaveError ] = useState(null)
  const [ isDeleting, setIsDeleting ] = useState(false)  // true when user clicked on the delete button, AND there was no selected image in the way.
  const [ deleteSuccess, setDeleteSuccess ] = useState(false)
  const [ deleteError, setDeleteError ] = useState(null)
  const [ imageData, setImageData ] = useState(null)  // This is the Data URL string that will be used to edit and preview the image client-side. 
  const [ imageBlob, setImageBlob ] = useState(null)  // This is the "File" that will be uploaded to Panoptes.

  const fileInputRef = useRef()
  const fileInputId = useId()

  function resetStates () {
    setIsSelecting(false)
    setSelectionMessage('')
    setSaveSuccess(false)
    setSaveError(null)
    setDeleteSuccess(false)
    setDeleteError(null)
  }

  const isBusy = isLoading || isValidating || isSaving || isDeleting || isSelecting
  
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
      resetStates()

      setIsSelecting(true)
      setImageData(null)
      setImageBlob(null)

      const newImageData = await readImageFile(selectedFile)
      const {
        string: resizedImageData,
        blob: resizedImageBlob
      } = await resizeImageData(newImageData, maxDataSize, optionalRatio)

      setIsSelecting(false)
      setSelectionMessage(t('Settings.forms.saveReminder'))

      setImageData(resizedImageData)
      setImageBlob(resizedImageBlob)

    } catch (err) {
      console.error(err)

      setIsSelecting(false)
      setSelectionMessage(err)

      setImageData(null)
      setImageBlob(null)
    }
  }

  async function onSubmit () {    
    const selectedFile = imageBlob

    // Sanity check
    if (isBusy) { return }
    if (!selectedFile) {
      setSaveSuccess(false)
      setSelectionMessage(t('Settings.forms.saveUnnecessary'))
      return
    }

    try {
      let shouldRevalidate = false

      await mutate(
        async (prevData) => {
          resetStates()

          setIsSaving(true)

          const uploadResult = await uploadUserMedia(authUser?.id, mediaType, selectedFile)
          if (!uploadResult) {
            throw new Error(`Failed to upload user ${mediaType}`)  // TODO: translations
          }

          setIsSaving(false)
          setSaveSuccess(true)

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

  // This function either deletes the user's existing media file, OR deletes and  
  async function doDelete () {
    // Sanity check
    if (isBusy) { return }

    // If 
    if (imageBlob || imageData) {
      setImageBlob(null)
      setImageData(null)
      setSelectionMessage(t('Settings.forms.selectionCleared'))
      return
    }

    try {
      let shouldRevalidate = false

      await mutate(
        async (prevData) => {
          resetStates()

          setIsDeleting(true)

          const deleteResult = await deleteUserMedia(authUser?.id, mediaType)
          if (!deleteResult) {
            throw new Error(`Failed to delete user ${mediaType}`)  // TODO: translations
          }

          setIsDeleting(false)
          setDeleteSuccess(true)

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

  // We don't worry about loading errors.
  const saveErrorMessage = saveError?.errors?.[0]?.message || saveError?.toString() || (saveError && 'Unknown error')
  const deleteErrorMessage = deleteError?.errors?.[0]?.message || deleteError?.toString() || (deleteError && 'Unknown error')

  const statusType =
    (saveSuccess || deleteSuccess) ? 'success'
    : (saveError || deleteError) ? 'error'
    : selectionMessage ? 'warning'  // TODO: this would preferably just be an 'info' type.
    : ''
  const statusMessage =
    saveSuccess ? t('Settings.forms.saveSuccess')
    : saveError ? saveErrorMessage
    : selectionMessage ? selectionMessage
    : deleteSuccess ? t('Settings.forms.deleteSuccess')
    : deleteError ? deleteErrorMessage
    : ''
  
  const imageSrc = imageData || currentUserMedia?.src
  const makeFileInputCircular = !!(makePreviewImageCircular && imageSrc)
  
  return (
    <Form
      className='ProfileAvatarForm'
      onSubmit={onSubmit}
    >
      <FormFieldsContainer margin={{ vertical: 'small' }}>

        <Box direction='column'>

          <FileInputContainer
            width={width}
            height={height}
          >

            {imageSrc ? (
              <PreviewImage
                role="img"
                alt={labels?.previewImage}
                src={imageSrc}
                circular={makeFileInputCircular ? 'true' : 'false'}
              />
            ):(
              <ContainerBackgroundWhenThereIsNoPreviewImage
                flex={false}
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
              </ContainerBackgroundWhenThereIsNoPreviewImage>
            )}

            <InvisibleFileInput
              id={fileInputId}
              name={mediaType}
              accept='image/*'
              onChange={onInputChange}
              disabled={isBusy}
              ref={fileInputRef}
              width={width}
              height={height}
              type='file'
            />

            {imageSrc && (
              <DeleteButton
                a11yTitle={t('Settings.forms.delete')}
                disabled={isBusy}
                height='40px'
                icon={<TrashIcon color='red' />}
                onClick={doDelete}
                plain
                width='40px'
              />
            )}
            
          </FileInputContainer>

          <Box
            direction='row'
            align='center'
            justify='between'
            gap='1em'
          >
            <Button
              disabled={isBusy}
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

            {isBusy && <Loader />}
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
