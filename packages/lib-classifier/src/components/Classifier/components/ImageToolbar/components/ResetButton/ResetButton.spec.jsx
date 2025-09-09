import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'

import mockStore from '@test/mockStore'

import ResetButtonContainer from './ResetButtonContainer'

describe('Component > ResetButton', function () {
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
      <ResetButtonContainer />, {
        wrapper: withStore(store)
      }
    )

    expect(screen.getByRole('button', { name: 'Reset subject view' })).to.exist
  })

  it('should reset the subject viewer when clicked', async function () {
    const store = mockStore()
    store.subjectViewer.enableRotation()
    store.subjectViewer.rotate()
    store.subjectViewer.invertView()

    expect(store.subjectViewer.rotation).to.equal(-90)
    expect(store.subjectViewer.invert).to.equal(true)

    render(
      <ResetButtonContainer />, {
        wrapper: withStore(store)
      }
    )

    await userEvent.click(screen.getByRole('button', { name: 'Reset subject view' }))

    expect(store.subjectViewer.rotation).to.equal(0)
    expect(store.subjectViewer.invert).to.equal(false)
  })
})
