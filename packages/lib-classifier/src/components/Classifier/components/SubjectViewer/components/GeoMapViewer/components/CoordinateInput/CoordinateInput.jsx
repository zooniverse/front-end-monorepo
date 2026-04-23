import { Box, Button, Text, TextInput } from 'grommet'
import { func } from 'prop-types'
import { useState } from 'react'

const DEFAULT_HANDLER = () => true

function CoordinateInput({
  onGoSubmit = DEFAULT_HANDLER
}) {
  const [coordinates, setCoordinates] = useState('')

  function handleGoSubmit() {
    if (coordinates.trim()) {
      onGoSubmit(coordinates)
    }
  }

  return (
    <Box direction='row' align='center' gap='small'>
      <Text as='label' htmlFor='coordinate-input' size='small'>
        Coordinates
      </Text>
      <TextInput
        id='coordinate-input'
        aria-label='Coordinates'
        width='small'
        value={coordinates}
        onChange={(e) => setCoordinates(e.target.value)}
      />
      <Button
        type='button'
        label='Go'
        onClick={handleGoSubmit}
      />
    </Box>
  )
}

CoordinateInput.propTypes = {
  onGoSubmit: func
}

export default CoordinateInput
