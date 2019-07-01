import { ResponsiveContext } from 'grommet'
import React from 'react'

function withResponsiveContext(WrappedComponent) {
  return props => (
    <ResponsiveContext.Consumer>
      {(size) => (
        <WrappedComponent {...props} screenSize={size} />
      )}
    </ResponsiveContext.Consumer>
  )
}

export default withResponsiveContext
