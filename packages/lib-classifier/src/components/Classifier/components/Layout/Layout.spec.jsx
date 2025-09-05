import { render } from '@testing-library/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'

import mockStore from '@test/mockStore'
import Layout from './Layout'

describe('Component > Layout', function () {
  it('should render without crashing', function () {
    render(
      <Grommet theme={zooTheme}>
        <Provider classifierStore={mockStore()}>
          <Layout />
        </Provider>
      </Grommet>
    )
  })
})
