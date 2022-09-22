import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'
import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import mockStore from '@test/mockStore'
import { QuickTalkContainer } from './QuickTalkContainer'
import { Tabs } from '@zooniverse/react-components'

/*
Workaround: prevent "infinite rendering Tabs" in Grommet 2.25
If a Grommet <Tab> is defined in a separate function than the parent Grommet
<Tabs>, it may cause an "infinite rendering loop" with the error message:
"Warning: Maximum update depth exceeded". One solution is to wrap the child
<Tab> in a React.memo.
*/
const QuickTalkContainerForTesting = React.memo(QuickTalkContainer)

const subject = {
  id: '100001',
  talkURL: 'https://www.zooniverse.org/projects/zootester/test-project/talk/subjects/100001',
}

const authClient = {}

describe('Component > QuickTalkContainer', function () {
  function withStore(store) {
    return function Wrapper({ children }) {
      return (
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>
            <Tabs>
              {children}
            </Tabs>
          </Provider>
        </Grommet>
      )
    }
  }

  beforeEach(function () {
    const store = mockStore()
    render(
      <QuickTalkContainerForTesting />,
      {
        wrapper: withStore(store)
      }
    )
  })

  it('should render without crashing', function () {
    expect(screen.queryByRole('tab', { name: 'QuickTalk.tabTitle' })).to.exist()
    expect(screen.queryByRole('link', { name: 'QuickTalk.goToTalk QuickTalk.opensInNewTab' })).to.exist()
  })
})
