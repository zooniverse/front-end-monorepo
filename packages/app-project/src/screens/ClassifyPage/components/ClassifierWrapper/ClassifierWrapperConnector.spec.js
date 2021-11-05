import { shallow } from 'enzyme'
import asyncStates from '@zooniverse/async-states'

import initStore from '@stores/initStore'
import ClassifierWrapperConnector from './ClassifierWrapperConnector'

describe('Component > ClassifierWrapperConnector', function () {
  let wrapper
  let store

  describe('after logging in', function () {
    before(function () {
      store = initStore(true, {
        user: {
          id: '1',
          loadingState: asyncStates.success,
          login: 'testUser'
        }
      })
      wrapper = shallow(<ClassifierWrapperConnector store={store} />)
    })

    describe('classifier wrapper props', function () {
      it('should include collections', function () {
        expect(wrapper.props().collections).to.equal(store.user.collections)
      })

      it('should include recents', function () {
        expect(wrapper.props().recents).to.equal(store.user.recents)
      })

      it('should include your personal stats', function () {
        expect(wrapper.props().yourStats).to.equal(store.user.personalization)
      })

      it('should include the project', function () {
        expect(wrapper.props().project).to.deep.equal(store.project)
      })

      it('should include the logged-in user', function () {
        expect(wrapper.props().user).to.equal(store.user)
      })

      it('should include the theme mode', function () {
        expect(wrapper.props().mode).to.equal(store.ui.mode)
      })
    })
  })
})
