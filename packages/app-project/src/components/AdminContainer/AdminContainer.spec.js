import zooTheme from '@zooniverse/grommet-theme'
import { render, screen } from '@testing-library/react'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { applySnapshot } from 'mobx-state-tree'

import initStore from '@stores'
import AdminContainer from './AdminContainer.js'

describe('Components > AdminContainer', function () {
  function withStore(snapshot) {
    const store = initStore(false)
    applySnapshot(store, snapshot)
    
    return function Wrapper({ children }) {
      return (
        <Grommet theme={zooTheme}>
          <Provider store={store}>
            {children}
          </Provider>
        </Grommet>
      )
    }
  }

  const project = {
    id: '1',
    strings: {
      display_name: 'Test Project'
    }
  }

  describe('without a logged-in user', function () {
    it('should render nothing', function () {
      const wrapper = withStore({ project })
      render(<AdminContainer />, { wrapper })
      const adminToggle = screen.queryByRole('checkbox', { name: 'AdminCheckbox.label' })
      expect(adminToggle).to.be.null()
    })
  })

  describe('with a regular user', function () {
    it('should render nothing', function () {
      const user = {
        id: '1',
        login: 'ordinaryVolunteer'
      }
      const wrapper = withStore({ project, user })
      render(<AdminContainer />, { wrapper })
      const adminToggle = screen.queryByRole('checkbox', { name: 'AdminCheckbox.label' })
      expect(adminToggle).to.be.null()
    })
  })

  describe('with an admin user', function () {
    it('should show an admin toggle', function () {
      const user = {
        id: '2',
        admin: true,
        login: 'zooAdmin'
      }
      const wrapper = withStore({ project, user })
      render(<AdminContainer />, { wrapper })
      const adminToggle = screen.queryByRole('checkbox', { name: 'AdminCheckbox.label' })
      expect(adminToggle).to.be.ok()
    })
  })
})