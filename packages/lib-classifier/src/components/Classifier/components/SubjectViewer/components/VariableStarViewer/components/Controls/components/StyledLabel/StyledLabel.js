import styled, { css } from 'styled-components'

const StyledLabel = styled.label`
  align-items: center;
  ${props => css`
    border: solid thin ${props.borderColor};
  `}
  border-radius: 10px;
  cursor: pointer;
  display: inline-flex;
  flex-direction: row;
  padding: 2.5px 5px;

  input {
    opacity: 0.01;
    position: absolute;
  }

  &:hover, &:focus-within {
    background-color: rgba(216,216,216,0.4);
  }
`
export default StyledLabel