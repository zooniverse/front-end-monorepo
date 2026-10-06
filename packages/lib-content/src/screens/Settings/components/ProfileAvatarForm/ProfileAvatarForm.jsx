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

// readFileAsDataURL is a utility function that wraps the FileReader around a
// Promise, just so we can use await.
function readFileAsDataURL (file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.addEventListener('load', () => {
      resolve(fileReader.result)
    })
    fileReader.addEventListener('error', () => {
      reject(fileReader.error)
    })
    fileReader.readAsDataURL(file)
  })
}

// processInputFileIntoImageData converts a File object into a data URL string.
// 
// Usage:
// const imageData = await readFileAsDataURL(imageFile)
// return <img src={imageData} />
//
// Input:
// - file: a File object. (e.g. from <input type="file">)
//
// Output: 
// - A Promise that returns a string (data URL) when resolved.
async function processInputFileIntoImageData (file) {
  if (!file) return
  return await readFileAsDataURL(file)
}

const TARGET_WIDTH = 200
const TARGET_HEIGHT = 100

function loadImageObjectFromData (imageData) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = (err) => reject(err)
    image.src = imageData
  })
}

async function resizeImageData (imageData, target = { width: TARGET_WIDTH, height: TARGET_HEIGHT }) {
  if (!imageData) return

  const {
    width: targetWidth,
    height: targetHeight,
    ratio: targetRatio
  } = target

  let width, height
  const canvas = document.createElement('canvas')
  const c2d = canvas.getContext('2d')
  const imageObject = await loadImageObjectFromData(imageData)

  let canvasWidth = targetWidth || imageObject.naturalWidth
  let canvasHeight = targetHeight || imageObject.naturalHeight

  // Optional: Set a white background.
  c2d.rect(0, 0, canvasWidth, canvasHeight)
  c2d.fillStyle = 'white'
  c2d.fill()

  // Draw the image onto the canvas.
  c2d.drawImage(imageObject, 0, 0, canvasWidth, canvasHeight)

  console.log('+++ imageData', imageData)
  console.log('+++ imageObject', imageObject)

  return canvas.toDataURL()  // By default, this is a PNG data URL with quality=1.
}

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
  const [ imageData, setImageData ] = useState(null)

  const fileInputRef = useRef()
  
  // When the File input changes, we'll do the following:
  // 1. read the selected image file as a Data URL string (image data).
  // 2. resize the image data 
  //   - we're cropping the image to a target width/height
  //   - AND we're double-making sure that the image is within an acceptable
  //     file size range.
  // 3. show the modified image data as a preview.
  // After that, the user has to click the Submit button to save changes.

  async function onInputChange (e) {
    const selectedFile = e.target.files?.[0]
    
    if (!selectedFile) {
      setImageData(null)
      return
    }

    try {
      setImageData(null)
      setSaveError(null)  // SaveError is pulling double duty here.

      const newImageData = await processInputFileIntoImageData(selectedFile)
      const resizedImageData = await resizeImageData(newImageData)
      setImageData(resizedImageData)

    } catch (err) {
      console.error(err)
      setImageData(null)
      setSaveError(err)
    }
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

      // Clear the temporary input file on successful upload.
      setImageData(null)

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
