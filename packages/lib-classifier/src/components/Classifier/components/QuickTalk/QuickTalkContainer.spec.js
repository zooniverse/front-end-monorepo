import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'
import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import mockStore from '@test/mockStore'
import { QuickTalkContainer } from './QuickTalkContainer'

const subject = {
  id: '100001',
  talkURL: 'https://www.zooniverse.org/projects/zootester/test-project/talk/subjects/100001',
}

const authClient = {}
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
