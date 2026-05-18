import styled from 'styled-components'
import { Box, Text } from 'grommet'

const StyledBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
`

export default function ErrorPlaceholder({ message }) {
  return (
    <StyledBox fill align='center' pad='medium'>
      <Text>{message}</Text>
    </StyledBox>
  )
}
