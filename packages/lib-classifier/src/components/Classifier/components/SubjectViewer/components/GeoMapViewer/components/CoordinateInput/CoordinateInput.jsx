import { SpacedText } from '@zooniverse/react-components'
import { Box, Button, Text, TextInput, ThemeContext } from 'grommet'
import { func } from 'prop-types'
import { useState } from 'react'

import { useTranslation } from '@translations/i18n'

import coordinateInputTheme from './coordinateInputTheme'

const DEFAULT_HANDLER = () => true

function isValidCoordinatesFormat(value) {
  const parts = value.split(',').map((part) => part.trim())
  if (parts.length !== 2) return false
  if (parts.some(p => p === '')) return false

  const latitude = Number(parts[0])
  const longitude = Number(parts[1])

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return false
  if (latitude < -90 || latitude > 90) return false
  if (longitude < -180 || longitude > 180) return false

  return true
}

function CoordinateInput({
  onGoSubmit = DEFAULT_HANDLER
}) {
  const { t } = useTranslation('components')
  const label = t('SubjectViewer.GeoMapViewer.CoordinateInput.label')
  const placeholder = t('SubjectViewer.GeoMapViewer.CoordinateInput.placeholder')
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
    <ThemeContext.Extend value={coordinateInputTheme}>
      <Box>
        <Box
          direction='row'
          align='center'
          gap='xsmall'
        >
          <SpacedText
            forwardedAs='label'
            htmlFor='coordinate-input'
            size='1rem'
            weight='bold'
          >
            {label}
          </SpacedText>
          <TextInput
            id='coordinate-input'
            aria-label={label}
            onChange={handleCoordinatesChange}
            onKeyDown={handleCoordinatesKeyDown}
            placeholder={<Text>{placeholder}</Text>}
            size='small'
            value={coordinates}
          />
          <Button
            type='button'
            label={<Text size='1rem'>{submitLabel}</Text>}
            onClick={handleGoSubmit}
          />
        </Box>
        {error && (
          <Text
            color='status-critical'
            size='small'
          >
            {error}
          </Text>
        )}
      </Box>
    </ThemeContext.Extend>
  )
}

CoordinateInput.propTypes = {
  onGoSubmit: func
}

export default CoordinateInput
