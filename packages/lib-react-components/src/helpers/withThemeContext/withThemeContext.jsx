import { ThemeContext } from 'grommet'

function withThemeContext (WrappedComponent, theme) {
  return props => (
    <ThemeContext.Extend value={theme}>
      <WrappedComponent {...props} />
    </ThemeContext.Extend>
  )
}

export default withThemeContext
