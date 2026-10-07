import PropTypes from 'prop-types'
import styled, { css, withTheme } from 'styled-components'

const StyledWrapper = styled.span`
  ${(props) => (props.theme.dark) ?
    css`color: ${props.theme.global.colors.text.dark};` :
    css`color: ${props.theme.global.colors.text.light};`}
  display: flex;
  justify-content: center;
`

const DEFAULT_THEME = {
  dark: false,
  global: {
    colors: {
      text: {}
    }
  }
}

function ResizeIcon ({
  theme = DEFAULT_THEME,
  ...props
}) {
  return (
    <StyledWrapper theme={theme} {...props}>&#8690;</StyledWrapper>
  )
}

ResizeIcon.propTypes = {
  theme: PropTypes.object
}

export default withTheme(ResizeIcon)
export { ResizeIcon }