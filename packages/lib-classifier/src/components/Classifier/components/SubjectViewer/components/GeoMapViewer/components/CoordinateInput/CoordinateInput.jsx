import { Box, Button, Text, TextInput } from 'grommet'

function CoordinateInput() {
  return (
    <Box direction='row' align='center' gap='small'>
      <Text as='label' htmlFor='coordinate-input' size='small'>
        Coordinates
      </Text>
      <TextInput
        id='coordinate-input'
        aria-label='Coordinates'
        width='small'
      />
      <Button
        type='button'
        label='Go'
      />
    </Box>
  )
}

export default CoordinateInput
