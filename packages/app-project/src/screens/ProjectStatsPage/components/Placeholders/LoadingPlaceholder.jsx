import styled from 'styled-components'
import { Box } from 'grommet'

const StyledBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.4;
  z-index: 999; // required so it displays over Grommet DataChart bars
`

export default function LoadingPlaceholder() {
  return <StyledBox background={{ light: 'neutral-6', dark: 'dark-3' }} fill />
}
