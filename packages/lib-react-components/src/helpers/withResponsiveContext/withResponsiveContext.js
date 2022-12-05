import { ResponsiveContext } from 'grommet'

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
