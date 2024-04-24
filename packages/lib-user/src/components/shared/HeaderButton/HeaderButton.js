import { Button } from 'grommet'
import styled, { css } from 'styled-components'

const HeaderButton = styled(Button)`
  ${props => css`
    color: ${props.theme.global.colors.white};
    background: ${props.theme.global.colors['neutral-1']};`
  }
  border: none;
  border-radius: 24px;
  box-shadow: none;

  &:hover {
    ${props => css`
      color: ${props.theme.global.colors.brand};
      background: ${props.theme.global.colors['accent-1']};

      svg {
        fill: ${props.theme.global.colors.brand};
        stroke: ${props.theme.global.colors.brand};
      }
    `}
    border: none;
    box-shadow: none;
  }
`

export default HeaderButton
