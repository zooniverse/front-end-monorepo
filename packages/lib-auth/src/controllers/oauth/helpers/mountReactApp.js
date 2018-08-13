import React from 'react'
import ReactDOM from 'react-dom'

import { AppWrapper } from '../../../views'

function mountReactApp ({
  client,
  component,
  element,
  store
}) {
  const Component = component
  ReactDOM.render((
    <AppWrapper client={client} store={store}>
      <Component />
    </AppWrapper>
  ), element)
}

export default mountReactApp
