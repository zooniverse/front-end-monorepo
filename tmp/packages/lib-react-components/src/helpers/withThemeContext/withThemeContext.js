import { ThemeContext } from 'grommet'
import React from 'react'

function withThemeContext (WrappedComponent, theme) {
  return props => (
    <ThemeContext.Extend value={theme}>
      <WrappedComponent {...props} />
    </ThemeContext.Extend>
  )
}

export default withThemeContext
