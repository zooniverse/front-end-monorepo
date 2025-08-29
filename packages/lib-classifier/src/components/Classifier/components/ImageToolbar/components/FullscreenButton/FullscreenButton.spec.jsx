import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'

import mockStore from '@test/mockStore'

import FullscreenButtonContainer from './FullscreenButtonContainer'

describe('Component > FullscreenButton', function () {
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

  describe('with fullscreen as false', function () {
    it('should have an accessible name', function () {
      const store = mockStore()

      render(
        <FullscreenButtonContainer show={true} />, {
          wrapper: withStore(store)
        }
      )

      expect(screen.getByRole('button', { name: 'ImageToolbar.FullscreenButton.ariaLabel.fullscreen' })).toBeDefined()
    })
  })

  describe('with fullscreen as true', function () {
    it('should have an accessible name', function () {
      const store = mockStore()
      store.subjectViewer.enableFullscreen()
      expect(store.subjectViewer.fullscreen).to.equal(true)

      render(
        <FullscreenButtonContainer show={true} />, {
          wrapper: withStore(store)
        }
      )

      expect(screen.getByRole('button', { name: 'ImageToolbar.FullscreenButton.ariaLabel.actualSize' })).toBeDefined()
    })
  })

  it('should change the subject viewer fullscreen state when clicked', async function () {
    const user = userEvent.setup({ delay: null })
    const store = mockStore()
    expect(store.subjectViewer.fullscreen).to.equal(false)

    render(
      <FullscreenButtonContainer show={true} />, {
        wrapper: withStore(store)
      }
    )

    await user.click(screen.getByRole('button', { name: 'ImageToolbar.FullscreenButton.ariaLabel.fullscreen' }))

    expect(store.subjectViewer.fullscreen).to.equal(true)
  })
})
