import React from 'react'

import AuthClientContext from '../../../../shared/AuthClientContext'

function WithClientContext (WrappedComponent) {
  return function HOC (props) {
    return (
      <AuthClientContext.Consumer>
        {client => <WrappedComponent {...props} client={client} />}
      </AuthClientContext.Consumer>
    )
  }
}

export default WithClientContext
