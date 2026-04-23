import { Box, Button, Text, TextInput } from 'grommet'
import { func } from 'prop-types'
import { useState } from 'react'

import { useTranslation } from '@translations/i18n'

const DEFAULT_HANDLER = () => true

function isValidCoordinatesFormat(value) {
  const parts = value.split(',').map((part) => part.trim())
  if (parts.length !== 2) return false

  const latitude = Number(parts[0])
  const longitude = Number(parts[1])

  return Number.isFinite(latitude) && Number.isFinite(longitude)
}

function CoordinateInput({
  onGoSubmit = DEFAULT_HANDLER
}) {
  const { t } = useTranslation('components')
  const label = t('SubjectViewer.GeoMapViewer.CoordinateInput.label')
  const submitLabel = t('SubjectViewer.GeoMapViewer.CoordinateInput.submit')
  const invalidCoordinatesError = t('SubjectViewer.GeoMapViewer.CoordinateInput.error.invalidFormat')

  const [coordinates, setCoordinates] = useState('')
  const [error, setError] = useState('')

  function handleGoSubmit() {
    const trimmedCoordinates = coordinates.trim()

    if (!trimmedCoordinates) return

    if (!isValidCoordinatesFormat(trimmedCoordinates)) {
      setError(invalidCoordinatesError)
      return
    }

    setError('')
    onGoSubmit(trimmedCoordinates)
  }

  function handleCoordinatesChange(event) {
    setCoordinates(event.target.value)
    if (error) {
      setError('')
    }
  }

  function handleCoordinatesKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleGoSubmit()
    }
  }

  return (
    <Box>
      <Box direction='row' align='center' gap='small'>
        <Text as='label' htmlFor='coordinate-input' size='small'>
          {label}
        </Text>
        <TextInput
          id='coordinate-input'
          aria-label={label}
          width='small'
          value={coordinates}
          onChange={handleCoordinatesChange}
          onKeyDown={handleCoordinatesKeyDown}
        />
        <Button
          type='button'
          label={submitLabel}
          onClick={handleGoSubmit}
        />
      </Box>
      {error && (
        <Text
          size='small'
          color='status-critical'
        >
          {error}
        </Text>
      )}
    </Box>
  )
}

CoordinateInput.propTypes = {
  onGoSubmit: func
}

export default CoordinateInput
