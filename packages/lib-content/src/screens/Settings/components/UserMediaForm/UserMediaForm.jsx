import { useId, useRef, useState } from 'react'
import { Box, Form, Paragraph, Text } from 'grommet'
import { AddCircle as AddIcon, Trash as TrashIcon } from 'grommet-icons'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { shape, string } from 'prop-types'

import { Loader, StatusMessage } from '@zooniverse/react-components'
import { IconActionButton } from '@zooniverse/react-components'

import Button from '../Button/Button'
import useUserMedia from '../../helpers/useUserMedia'
import uploadUserMedia from '../../helpers/uploadUserMedia'
import deleteUserMedia from '../../helpers/deleteUserMedia'
import readImageFile from '../../helpers/readImageFile'
import resizeImageData from '../../helpers/resizeImageData'

const VALID_MEDIA_TYPES = ['avatar', 'profile_header']

const FormFieldsContainer = styled(Box)`
  input:user-invalid {
    border-color: ${props => props.theme.global.colors['neutral-4']};
  }
`

const BigLabel = styled(Text)`
  font-weight: 700;
  font-style: bold;
  text-transform: uppercase;
`

// The File Input Container 
// - If the custom hasMedia property is true, it means the container has a
//   preview image - either an existing user media asset, or a newly uploaded
//   one that needs to be saved.
// - Otherwise, the container will be a grey square or rectangle awaiting input. 
const FileInputContainer = styled(Box)`
  position: relative;
`

// When there's no current media file, NOR a selected media file to upload, show
// a prompt that says "pls select a file thx".
const ContainerBackgroundWhenThereIsNoCurrentOrSelectedImage = styled(Box)`
  ${props => css`border: 0.5px solid ${props.theme.global.colors['light-5']};`}
  border-radius: 4px;
  ${props => !props.theme.dark
    ? css` 
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(239, 242, 245, 0.40) 100%), rgba(255, 255, 255, 0.20);
    ` : css`
      background: linear-gradient(180deg, rgba(45, 45, 45, 0.00) 0%, rgba(51, 51, 51, 0.60) 100%), #404040;
  `}
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.25) inset;

`

// Used to display the media image - either the user's current media file
// (avatar/profile header), OR the one the user just selected to upload. 
const CurrentOrSelectedImage = styled('img')`
  ${props => css`
    width: ${props.width};
    height: ${props.height};
  `}
  object-fit: contain;
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
//   <DeleteButton />
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

function UserMediaForm ({
  authUser,
  makeImageCircular = false,
  maxDataSize = 0,
  mediaType = '',  // Must be one of VALID_MEDIA_TYPES
  labels = {
    main: '',
    image: '',
    body: '',
  },
  optionalRatio = false,  // Use optionalRatio=1 to ensure images are cropped to a 1:1 square.
  width = '',  // Any CSS value, e.g. '128px'
  height = '',
  ...rest
}) {
  const { t } = useTranslation()
  const { data: currentUserMedia, isLoading, error: loadError, isValidating, mutate } = useUserMedia({ userId: authUser?.id, mediaType: mediaType })

  // The "Selecting" operation triggers when a user is choosing an image to
  // upload via the file input. This operation is entirely client-side.
  // - selectionMessage provides additional (non-error) feedback when selecting
  //   (or clearing) an image to upload.
  const [ isSelecting, setIsSelecting ] = useState(false)
  const [ selectionMessage, setSelectionMessage ] = useState('')
  const [ imageData, setImageData ] = useState(null)  // This is the Data URL string that will be used to edit and preview the image client-side. 
  const [ imageBlob, setImageBlob ] = useState(null)  // This is the "File" that will be uploaded to Panoptes.

  // The "Save" operation occurs when the user has selected an image, and
  // clicks on the Save button. This operation pings Panoptes.
  const [ isSaving, setIsSaving ] = useState(false)
  const [ saveSuccess, setSaveSuccess ] = useState(false)
  const [ saveError, setSaveError ] = useState(null)
  
  // The "Delete" operation occurs when the user has an existing current media
  // file, AND has not selected a new image to upload, and then clicks the
  // Delete button. This operation pings Panoptes.
  // NOTE:
  // - The Delete button also doubles for triggering the "Clearing" operation.
  //   i.e. if the user has selected an image to upload, but then changes their
  //   mind, the Delete button clears their selected file.
  // - The "Clearing" operation isn't tracked by the "Delete" operation state
  //   variables, but it does use selectionMessage.
  const [ isDeleting, setIsDeleting ] = useState(false)  // true when user clicked on the delete button, AND there was no selected image in the way.
  const [ deleteSuccess, setDeleteSuccess ] = useState(false)
  const [ deleteError, setDeleteError ] = useState(null)
  
  const fileInputRef = useRef()
  const fileInputId = useId()

  // Reset operation states. Call this before initiating a new "Selecting",
  // "Save", or "Delete" operation.
  function resetStates () {
    setIsSelecting(false)
    setSelectionMessage('')
    setIsSaving(false)
    setSaveSuccess(false)
    setSaveError(null)
    setIsDeleting(false)
    setDeleteSuccess(false)
    setDeleteError(null)
  }

  // If a FETCH, SAVE, DELETE, or SELECTING operation is ongoing, don't let
  // other operations trigger.
  const isBusy = isLoading || isValidating || isSaving || isDeleting || isSelecting

  /*
  When the File input changes, we'll do the following:
  1. read the selected image file as a Data URL string (image data).
  2. resize the image data to an acceptable file size range (and optionally,
     the image will be cropped to meet a specific aspect ratio).
  3. show the modified image data as a preview.
  After that, the user has to click the Submit button to save changes.
   */
  async function onInputChange (e) {
    const selectedFile = e.target.files?.[0]

    // Sanity check
    if (isBusy) { return }
    if (!selectedFile) {
      setImageData(null)
      setImageBlob(null)
      return
    }

    try {
      // Initialise "Selecting" operation state
      resetStates()
      setIsSelecting(true)
      setImageData(null)
      setImageBlob(null)

      // Read the file the user selected, and attempt to resize it. 
      const newImageData = await readImageFile(selectedFile)
      const {
        string: resizedImageData,
        blob: resizedImageBlob
      } = await resizeImageData(newImageData, maxDataSize, optionalRatio)

      // Operation complete!
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

  /*
  aka doSave()
  When user clicks on the Save button, we try to send resized image to Panoptes.
  See uploadUserMedia.js for the multi-step process required!
   */
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
          
          // Initialise "Save" operation state
          resetStates()
          setIsSaving(true)

          // Save data to Panoptes.
          const uploadResult = await uploadUserMedia(authUser?.id, mediaType, selectedFile)
          if (!uploadResult) {
            throw new Error(`Failed to upload user ${mediaType}`)  // TODO: translations
          }

          // Operation complete!
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

  /*
  This function either delete's the user's existing media file, OR clears any
  selected image file.
   */
  async function doDelete () {
    // Sanity check
    if (isBusy) { return }

    // If user has selected an image to upload, then the Delete button just
    // clears that selected image WITHOUT deleting any existing user media
    // resource on Panoptes.
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

          // Initialise "Delete" operation state
          resetStates()
          setIsDeleting(true)

          // Send a DELETE request to Panoptes.
          const deleteResult = await deleteUserMedia(authUser?.id, mediaType)
          if (!deleteResult) {
            throw new Error(`Failed to delete user ${mediaType}`)  // TODO: translations
          }

          // Operation complete!
          setIsDeleting(false)
          setDeleteSuccess(true)
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

  // The <StatusMessage> component is used to provide feedback on all stages of
  // a Save/Delete/Selecting operation.
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

  // If the user has an existing media resource (e.g. an existing avatar), OR
  // they've just selected a new image file to upload, we want to show that
  // image.
  const imageSrc = imageData || currentUserMedia?.src
  const makeFileInputCircular = !!(makeImageCircular && imageSrc)

  if (!VALID_MEDIA_TYPES.includes(mediaType)) { return null }
  
  return (
    <Form
      className='UserMediaForm'
      onSubmit={onSubmit}
      {...rest}
    >
      <FormFieldsContainer
        direction='column'
        margin={{ vertical: 'small' }}
      >
        <BigLabel
          as='label'
          htmlFor={fileInputId}
        >
          {labels?.main}
        </BigLabel>

        <Paragraph>{labels?.body}</Paragraph>

        <FileInputContainer
          width={width}
          height={height}
        >
          {imageSrc ? (
            <CurrentOrSelectedImage
              alt={labels?.image}
              src={imageSrc}
              circular={makeFileInputCircular ? 'true' : 'false'}
              width={width}
              height={height}
            />
          ):(
            <ContainerBackgroundWhenThereIsNoCurrentOrSelectedImage
              flex={false}
              width={width}
              height={height}
              align='center'
              justify='center'
            >
              <AddIcon color='brand' size='large' />
              <Text
                textAlign='center'
                width={{ max: '85%' }}
              >
                {t('Settings.forms.selectImage')}
              </Text>
            </ContainerBackgroundWhenThereIsNoCurrentOrSelectedImage>
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
          margin={{ vertical: 'small' }}
          wrap={true}
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
      </FormFieldsContainer>
    </Form>
  )
}

UserMediaForm.propTypes = {
  authUser: shape({
    id: string,
    login: string
  }).isRequired,
}

export default UserMediaForm
