import { Box, Button, Text, TextInput } from 'grommet'
import { func } from 'prop-types'
import { useState } from 'react'

const DEFAULT_HANDLER = () => true
const INVALID_COORDINATES_ERROR = 'Coordinates must be in "latitude, longitude" format.'

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
  const [coordinates, setCoordinates] = useState('')
  const [error, setError] = useState('')

  function handleGoSubmit() {
    const trimmedCoordinates = coordinates.trim()

    if (!trimmedCoordinates) return

    if (!isValidCoordinatesFormat(trimmedCoordinates)) {
      setError(INVALID_COORDINATES_ERROR)
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
          Coordinates
        </Text>
        <TextInput
          id='coordinate-input'
          aria-label='Coordinates'
          width='small'
          value={coordinates}
          onChange={handleCoordinatesChange}
          onKeyDown={handleCoordinatesKeyDown}
        />
        <Button
          type='button'
          label='Go'
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
