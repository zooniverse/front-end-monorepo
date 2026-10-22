import { Button as GrommetButton } from 'grommet'
import styled from 'styled-components'

const StyledButton = styled(GrommetButton)`
  border-width: 0.5px;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
`

export default function Button (props) {
  return (<StyledButton {...props} />)
}