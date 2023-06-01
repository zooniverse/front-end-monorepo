import { expect } from 'chai'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'

import mockStore from '@test/mockStore'

import MoveButtonContainer from './MoveButtonContainer'

describe('Component > MoveButton', function () {
  function withStore (store) {
    return function Wrapper ({ children }) {
      return (
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>
            {children}
          </Provider>
        </Grommet>
      )
    }
  }
  
  it('should have an accessible name', function () {
    const store = mockStore()
    
    render(
      <MoveButtonContainer />, {
        wrapper: withStore(store)
      }
    )

    expect(screen.getByRole('button', { name: 'ImageToolbar.MoveButton.ariaLabel' })).to.be.ok()
  })

  it('should change the subject viewer annotate and move state when clicked', async function () {
    const user = userEvent.setup({ delay: null })
    const store = mockStore()

    expect(store.subjectViewer.move).to.be.false()
    expect(store.subjectViewer.annotate).to.be.true()
    
    render(
      <MoveButtonContainer />, {
        wrapper: withStore(store)
      }
    )

    await user.click(screen.getByRole('button', { name: 'ImageToolbar.MoveButton.ariaLabel' }))

    expect(store.subjectViewer.move).to.be.true()
    expect(store.subjectViewer.annotate).to.be.false()
  })
})
