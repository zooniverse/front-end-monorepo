import { Button } from 'grommet'
import styled from 'styled-components'

const StyledCertificateButton = styled(Button)`
  background-color: ${props => props.theme.dark ? props.theme.global.colors['dark-3'] : props.theme.global.colors['neutral-6']};
  border-radius: 4px;
  color: ${props => props.theme.dark ? props.theme.global.colors['light-3'] : props.theme.global.colors['dark-5']};
  min-width: 100px;
`

export default StyledCertificateButton
