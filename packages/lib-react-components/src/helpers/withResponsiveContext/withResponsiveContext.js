import { ResponsiveContext } from 'grommet'
import React from 'react'

function withResponsiveContext(WrappedComponent) {
  return props => (
    <ResponsiveContext.Consumer>
      {(size) => (
        <WrappedComponent {...props} size={size} />
      )}
    </ResponsiveContext.Consumer>
  )
}

export default withResponsiveContext
