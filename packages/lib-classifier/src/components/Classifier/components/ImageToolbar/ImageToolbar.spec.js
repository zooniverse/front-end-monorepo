import { render } from '@testing-library/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'

import mockStore from '@test/mockStore/mockStore.js'

import ImageToolbar from './ImageToolbar'

describe('Component > ImageToolbar', function () {
  function withStore() {
    return function Wrapper({
      children = null,
      store = mockStore()
    }) {
      return (
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>
            {children}
          </Provider>
        </Grommet>
      )
    }
  }

  it('should render without crashing', function () {
    render(
      <ImageToolbar />,
      {
        wrapper: withStore()
      }
    )
  })
})
