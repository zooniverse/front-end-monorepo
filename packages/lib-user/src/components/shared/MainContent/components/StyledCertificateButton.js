import { Button } from 'grommet'
import styled from 'styled-components'

const StyledCertificateButton = styled(Button)`
  background-color: ${props => props.theme.global.colors['neutral-1']};
  border-radius: 4px;
  color: ${props => props.theme.global.colors['neutral-6']};
`

export default StyledCertificateButton
