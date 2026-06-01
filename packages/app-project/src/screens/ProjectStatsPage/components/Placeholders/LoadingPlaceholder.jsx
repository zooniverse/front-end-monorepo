import styled from 'styled-components'
import { Box } from 'grommet'

const StyledBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
`

export default function LoadingPlaceholder() {
  return <StyledBox background={{ light: 'neutral-6', dark: 'dark-3' }} fill />
}
