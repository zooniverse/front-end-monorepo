import { render } from '@testing-library/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'

import mockStore from '@test/mockStore'
import MaxWidth from './MaxWidth'

describe('Component > MaxWidth', function () {
  it('should render without crashing', function () {
    render(
      <Grommet theme={zooTheme}>
        <Provider classifierStore={mockStore()}>
          <MaxWidth />
        </Provider>
      </Grommet>
    )
  })
})
