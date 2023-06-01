import { expect } from 'chai'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'

import mockStore from '@test/mockStore'

import AnnotateButtonContainer from './AnnotateButtonContainer'

describe('Component > AnnotateButton', function () {
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
      <AnnotateButtonContainer />, {
        wrapper: withStore(store)
      }
    )

    expect(screen.getByRole('button', { name: 'ImageToolbar.AnnotateButton.ariaLabel' })).to.be.ok()
  })

  it('should change the subject viewer annotate and move states when clicked', async function () {
    const user = userEvent.setup({ delay: null })

    const store = mockStore()
    store.subjectViewer.enableMove()

    expect(store.subjectViewer.annotate).to.be.false()
    expect(store.subjectViewer.move).to.be.true()

    render(
      <AnnotateButtonContainer />, {
        wrapper: withStore(store)
      }
    )

    await user.click(screen.getByRole('button', { name: 'ImageToolbar.AnnotateButton.ariaLabel' }))

    expect(store.subjectViewer.annotate).to.be.true()
    expect(store.subjectViewer.move).to.be.false()
  })
})
