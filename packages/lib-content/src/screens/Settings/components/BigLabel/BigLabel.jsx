import styled, { css } from 'styled-components'

const BigLabel = styled(Text)`
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  ${props =>props.theme.dark
    ? css`color: ${props.theme.global.colors['neutral-6']};`
    : css`color: ${props.theme.global.colors['dark-4']};`
  }
`

export default BigLabel