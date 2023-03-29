import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'

const StyledSpan = styled.span`
  background-color: ${props => props.color};
  border-radius: 8px;
  color: ${props => props.theme.global.colors.text.light};
  padding: .1em .4em .2em;
`

const StyledDeleteButton = styled.button`
  border: none;
  background: transparent;
  font-size: 1.4em;
  padding: 0;
  vertical-align: middle;

  &:hover {
    cursor: pointer;
  }
`

function Selection ({
  color,
  handleDelete,
  text,
  theme
}) {
  return (
    <StyledSpan
      data-selection={text}
      color={color}
      theme={theme}
    >
      {text}
      {' '}
      <StyledDeleteButton
        aria-label='Delete'
        onClick={handleDelete}
        title='Delete'
      >
        &times;
      </StyledDeleteButton>
    </StyledSpan>
  )
}

Selection.propTypes = {
  color: PropTypes.string,
  handleDelete: PropTypes.func,
  text: PropTypes.string
}

export default withTheme(Selection)
