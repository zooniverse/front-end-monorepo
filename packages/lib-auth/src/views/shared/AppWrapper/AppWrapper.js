import { Grommet } from 'grommet'
import React from 'react'
import { Provider } from 'mobx-react'

import AuthClientContext from '../AuthClientContext'

function AppWrapper ({ children, client, store }) {
  return (
    <Provider store={store}>
      <AuthClientContext.Provider value={client}>
        <Grommet>
          {children}
        </Grommet>
      </AuthClientContext.Provider>
    </Provider>
  )
}

export default AppWrapper
