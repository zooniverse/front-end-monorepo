import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'mobx-react'
import { applySnapshot } from 'mobx-state-tree'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import auth from 'panoptes-client/lib/auth'
import nock from 'nock'
import sinon from 'sinon'

import initStore from '@stores'
import ZooHeaderWrapperContainer, { signOut } from './ZooHeaderWrapperContainer'

describe('Component > ZooHeaderWrapperContainer', function () {
  this.timeout(5000)
  let pageURL, siteMenu, store

  const routerMock = {
    asPath: 'projects/foo/bar',
    push: sinon.stub().callsFake((url) => pageURL = url.toString()),
    prefetch: () => new Promise((resolve, reject) => {}),
    query: { owner: 'foo', project: 'bar' }
  }

  beforeEach(function () {
    nock('https://talk-staging.zooniverse.org')
    .get('/notifications')
    .query(true)
    .reply(200, {})
    .get('/conversations')
    .query(true)
    .reply(200, {})
    // TODO: Recent Talk subjects are using the Panoptes client instead of the Talk API client.
    nock('https://panoptes-staging.zooniverse.org/api')
    .persist()
    .get('/comments')
    .query(true)
    .reply(200, { comments: [] })

    sinon.stub(auth, 'signOut').callsFake(() => Promise.resolve())
    window.sessionStorage.setItem("subjectsSeenThisSession", JSON.stringify(["1234/5678"]))
    const snapshot = {
      project: {
        configuration: {
          languages: ['en']
        },
        slug: 'foo/bar',
        strings: {
          display_name: 'Foobar'
        },
        links: {
          active_workflows: ['1']
        }
      },
      user: {
        id: '1',
        display_name: 'TestUser',
        login: 'test-user'
      }
    }
    store = initStore(false)
    applySnapshot(store, snapshot)
    render(
      <RouterContext.Provider value={routerMock}>
        <Provider store={store}>
          <Grommet theme={zooTheme} themeMode='light'>
            <ZooHeaderWrapperContainer />
          </Grommet>
        </Provider>
      </RouterContext.Provider>
    )
    siteMenu = screen.getByRole('navigation', { name: 'ZooHeader.ariaLabel' })
  })

  afterEach(function () {
    auth.signOut.restore()
  })

  it('should contain the site navigation menu', function () {
    expect(siteMenu).to.exist()
  })

  it('should clear the stored user on sign out', function () {
    expect(store.user.isLoggedIn).to.be.true()
    signOut(store.user)
    expect(store.user.isLoggedIn).to.be.false()
  })

  it('should sign out of Panoptes', function () {
    signOut(store.user)
    expect(auth.signOut).to.have.been.calledOnce()
  })

  it('should remove already seen subjects session storage', async function () {
    expect(window.sessionStorage.getItem("subjectsSeenThisSession")).to.equal('["1234/5678"]')
    signOut(store.user)
    expect(window.sessionStorage.getItem("subjectsSeenThisSession")).to.be.null()
  })

  describe('Sign In', function () {
    let signInButton

    beforeEach(function () {
      signOut(store.user)
    })

    it('should navigate to ./?login=true', async function () {
      const user = userEvent.setup({ delay: null })
      signInButton = screen.getByRole('button', { name: 'ZooHeader.SignedOutUserNavigation.signIn' })
      await user.click(signInButton)
      expect(pageURL.toString()).to.equal('https://localhost/?login=true')
    })
  })

  describe('Register', function () {
    let registerButton

    beforeEach(function () {
      signOut(store.user)
    })

    it('should navigate to ./?register=true', async function () {
      const user = userEvent.setup({ delay: null })
      registerButton = screen.getByRole('button', { name: 'ZooHeader.SignedOutUserNavigation.register' })
      await user.click(registerButton)
      expect(pageURL.toString()).to.equal('https://localhost/?register=true')
    })
  })
})
