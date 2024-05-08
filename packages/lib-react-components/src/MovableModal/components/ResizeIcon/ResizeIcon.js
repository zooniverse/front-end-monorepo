import styled, { css } from 'styled-components'

const StyledWrapper = styled.span`
  ${(props) => (props.theme.dark) ?
    css`color: ${props.theme.global.colors.text.dark};` :
    css`color: ${props.theme.global.colors.text.light};`}
  display: flex;
  justify-content: center;
`

function ResizeIcon (props) {
  return (
    <StyledWrapper {...props}>&#8690;</StyledWrapper>
  )
}

export default ResizeIcon
