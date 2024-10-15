import { Button } from 'grommet'
import styled, { css } from 'styled-components'

const StyledTab = styled(Button)`
  background-color: ${props => props.theme.dark ? props.theme.global.colors['dark-3'] : props.theme.global.colors['neutral-6']};
  border-bottom: 4px solid transparent;
  color: ${props => props.theme.dark ? props.theme.global.colors['light-3'] : props.theme.global.colors['dark-5']};
  font-size: 1em;
  text-align: center;

  ${props => props.active && css`
    border-bottom: 4px solid ${props.theme.global.colors['neutral-1']};
    font-weight: 700;
    color: ${props => props.theme.dark ? props.theme.global.colors.white : props.theme.global.colors.black};
  `}

  ${props => !props.active && css`
    &:focus, &:hover {
      border-bottom: 4px solid ${props.theme.dark ? props.theme.global.colors['light-3'] : props.theme.global.colors['neutral-7']};
      color: ${props.theme.dark ? props.theme.global.colors['light-3'] : props.theme.global.colors['neutral-7']};
    }
  `}
`

export default StyledTab
