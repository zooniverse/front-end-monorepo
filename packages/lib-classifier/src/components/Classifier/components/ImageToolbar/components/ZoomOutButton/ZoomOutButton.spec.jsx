import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import sinon from 'sinon'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'

import mockStore from '@test/mockStore'

import ZoomOutButtonContainer from './ZoomOutButtonContainer'

describe('Component > ZoomOutButton', function () {
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

  before(function () {
    sinon.stub(console, 'error')
  })

  after(function () {
    console.error.restore()
  })

  it('should have an accessible name', function () {
    const store = mockStore()

    render(
      <ZoomOutButtonContainer />, {
        wrapper: withStore(store)
      }
    )

    expect(screen.getByRole('button', { name: 'ImageToolbar.ZoomOutButton.ariaLabel' })).to.be.ok()
  })

  it('should zoom in the subject viewer when clicked', async function () {
    const user = userEvent.setup({ delay: null })
    const zoomSpy = sinon.spy()
    const store = mockStore()
    store.subjectViewer.setOnZoom(zoomSpy)

    render(
      <ZoomOutButtonContainer />, {
        wrapper: withStore(store)
      }
    )

    await user.click(screen.getByRole('button', { name: 'ImageToolbar.ZoomOutButton.ariaLabel' }))

    expect(zoomSpy).to.have.been.calledOnceWith("zoomout", -1)
  })
})
