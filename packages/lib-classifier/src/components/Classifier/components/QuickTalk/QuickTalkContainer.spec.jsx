import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'

import mockStore from '@test/mockStore'
import { QuickTalkContainer } from './QuickTalkContainer'

const quickTalkButton_target = { name: 'QuickTalk.aria.openButton' }

describe('Component > QuickTalkContainer', function () {
  function withStore(store) {
    return function Wrapper({ children }) {
      return (
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>
            {children}
          </Provider>
        </Grommet>
      )
    }
  }

  describe('when collapsed', function () {
    beforeEach(function () {
      const store = mockStore()
      render(
        <QuickTalkContainer />,
        {
          wrapper: withStore(store)
        }
      )
    })

    it('should render without crashing', function () {
      expect(screen.queryByRole('button', quickTalkButton_target)).to.exist()
    })
  })
})
