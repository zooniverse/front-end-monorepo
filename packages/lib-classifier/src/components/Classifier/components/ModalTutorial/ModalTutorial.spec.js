import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { when } from 'mobx'
import { Provider } from 'mobx-react'
import sinon from 'sinon'

import { ModalTutorial } from './ModalTutorial'
import { Modal } from '@zooniverse/react-components'
import asyncStates from '@zooniverse/async-states'
import { TutorialFactory, UPPFactory } from '@test/factories'
import mockStore  from '@test/mockStore'

describe('ModalTutorial', function () {
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

  const steps = [
    { content: "Hello" },
    { content: "Step 2" }
  ]

  it('should render null if a tutorial has not been successfully loaded', function () {
    const store = mockStore()
    render(
      <ModalTutorial />,
      {
        wrapper: withStore(store)
      }
    )
    const tutorialTitle = screen.queryByRole('heading', { level: 2, name: 'ModalTutorial.title' })
    expect(tutorialTitle).to.be.null()
  })

  it('should not show the tutorial if it has been seen before', async function () {
    const store = mockStore()
    const tutorialSnapshot = TutorialFactory.build({ steps })
    store.tutorials.setTutorials([tutorialSnapshot])
    await when(() => store.userProjectPreferences.loadingState === asyncStates.success)
    const upp = UPPFactory.build()
    store.userProjectPreferences.setUPP(upp)
    store.userProjectPreferences.setHeaders({
      etag: 'mockETagForTests'
    })
    const tutorial = store.tutorials.active
    render(
      <ModalTutorial
        tutorial={tutorial}
      />,
      {
        wrapper: withStore(store)
      }
    )
    const tutorialTitle = screen.queryByRole('heading', { level: 2, name: 'ModalTutorial.title' })
    expect(tutorialTitle).to.be.null()
  })

  it('should show the tutorial if it hasn\'t been seen before', async function () {
    const store = mockStore()
    const tutorialSnapshot = TutorialFactory.build({ steps })
    store.tutorials.setTutorials([tutorialSnapshot])
    await when(() => store.userProjectPreferences.loadingState === asyncStates.success)
    const upp = UPPFactory.build()
    store.userProjectPreferences.setUPP(upp)
    store.userProjectPreferences.setHeaders({
      etag: 'mockETagForTests'
    })
    const tutorial = store.tutorials.active
    render(
      <ModalTutorial
        hasNotSeenTutorialBefore
        tutorial={tutorial}
      />,
      {
        wrapper: withStore(store)
      }
    )
    const tutorialTitle = screen.getByRole('heading', { level: 2, name: 'ModalTutorial.title' })
    expect(tutorialTitle).to.be.ok()
  })

  describe('on close', function () {
    let store
    let user

    beforeEach(async function () {
      store = mockStore()
      user = userEvent.setup()
      const tutorialSnapshot = TutorialFactory.build({ steps })
      store.tutorials.setTutorials([tutorialSnapshot])
      await when(() => store.userProjectPreferences.loadingState === asyncStates.success)
      const upp = UPPFactory.build()
      store.userProjectPreferences.setUPP(upp)
      store.userProjectPreferences.setHeaders({
        etag: 'mockETagForTests'
      })
    })

    it('should record the active tutorial as complete', async function () {
      const clock = sinon.useFakeTimers({ now: new Date('2022-03-01T12:00:00Z'), toFake: ['Date'] })
      const tutorial = store.tutorials.active
      const seen = new Date().toISOString()
      const wrapper = render(
        <ModalTutorial
          hasNotSeenTutorialBefore
          tutorial={tutorial}
        />,
        {
          wrapper: withStore(store)
        }
      )
      const closeButton = screen.getByRole('button', { name: 'Close' })
      await user.click(closeButton)
      const upp = store.userProjectPreferences.active
      expect(upp?.preferences.tutorials_completed_at[tutorial.id]).to.equal(seen)
      clock.restore()
    })

    it('should close the tutorial', async function () {
      const tutorial = store.tutorials.active
      const wrapper = render(
        <ModalTutorial
          hasNotSeenTutorialBefore
          tutorial={tutorial}
        />,
        {
          wrapper: withStore(store)
        }
      )
      let tutorialTitle = screen.getByRole('heading', { level: 2, name: 'ModalTutorial.title' })
      expect(tutorialTitle).to.be.ok()
      const closeButton = screen.getByRole('button', { name: 'Close' })
      await user.click(closeButton)
      tutorialTitle = screen.queryByRole('heading', { level: 2, name: 'ModalTutorial.title' })
      expect(tutorialTitle).to.be.null()
    })
  })
})
