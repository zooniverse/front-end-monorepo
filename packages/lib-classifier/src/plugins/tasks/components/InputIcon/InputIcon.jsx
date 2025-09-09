import { node, string } from 'prop-types'
import styled, { css } from 'styled-components'

export const StyledInputIcon = styled.span`
  ${props => props.color && css`color: ${props.color};`}
  background-color: #2D2D2D;
  display: flex;
  align-items: center;
  padding: 15px;

  > svg {
    fill-opacity: 0.1;
    height: 1.5em;
    stroke: currentColor;
    stroke-width: 5;
    width: 1.5em;
  }
`

export default function InputIcon ({ color = 'white', icon }) {
  return (
    <StyledInputIcon color={color}>
      {icon}
    </StyledInputIcon>
  )
}

InputIcon.propTypes = {
  color: string,
  icon: node.isRequired
}
