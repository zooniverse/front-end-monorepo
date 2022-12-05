import PropTypes from 'prop-types'
import styled, { css, withTheme } from 'styled-components'

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

ResizeIcon.defaultProps = {
  theme: {
    dark: false,
    global: {
      colors: {
        text: {}
      }
    }
  }
}

ResizeIcon.propTypes = {
  theme: PropTypes.object
}

export default withTheme(ResizeIcon)
export { ResizeIcon }