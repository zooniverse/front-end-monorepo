import { node, string } from 'prop-types'
import styled, { css } from 'styled-components'

// In some cases, project teams choose 'black' as their drawing tool color
// and we need to style the InputIcon with a lighter background for contrast.
// 'black' is not in the drawingTools colors in lib-grommet-theme, but could be use in a legacy Zooniverse project.
export const StyledInputIcon = styled.span`
  ${props => props.color && css`color: ${props.color};`}
  display: flex;
  align-items: center;
  padding: 15px;
 ${props => props.color === 'rgb(0, 0, 0)' ? css`background: radial-gradient(#cbcccb 0%, #2D2D2D 80%);` : css`background: #2D2D2D;`}

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
