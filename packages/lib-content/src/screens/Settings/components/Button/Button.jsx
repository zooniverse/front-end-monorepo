import { Button as GrommetButton } from 'grommet'
import styled, { css } from 'styled-components'

const StyledButton = styled(GrommetButton)`
  border-width: 0.5px;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;

  ${props => !props.theme.dark
    ? css`
      background: ${props.theme.global.colors['neutral-6']};  /* white. This could be transparent, honestly. */
      border-color: ${props.theme.global.colors['neutral-1']};  /* dark teal */
      color: ${props.theme.global.colors['neutral-7']};  /* black */
    ` : `
      background: ${props.theme.global.colors['dark-4']};  /* #404040 almost-black. This assumes page background is pure black. */
      border-color: ${props.theme.global.colors['accent-1']};  /* light teal */
      color: ${props.theme.global.colors['neutral-6']};  /* white */
    `
  }
`

export default function Button (props) {
  return (<StyledButton {...props} />)
}