import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'

import mockStore from '@test/mockStore'

import RotateButtonContainer from './RotateButtonContainer'

describe('Component > RotateButton', function () {
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
    store.subjectViewer.enableRotation()

    render(
      <RotateButtonContainer />, {
        wrapper: withStore(store)
      }
    )

    expect(screen.getByRole('button', { name: 'Rotate subject' })).to.exist
  })

  it('should rotate the subject viewer when clicked', async function () {
    const user = userEvent.setup({ delay: null })
    const store = mockStore()
    store.subjectViewer.enableRotation()

    expect(store.subjectViewer.rotation).to.equal(0)

    render(
      <RotateButtonContainer />, {
        wrapper: withStore(store)
      }
    )

    await user.click(screen.getByRole('button', { name: 'Rotate subject' }))

    expect(store.subjectViewer.rotation).to.equal(-90)
  })
})
