import { shallow } from 'enzyme'
import asyncStates from '@zooniverse/async-states'

import initStore from '@stores/initStore'
import ClassifierWrapperConnector from './ClassifierWrapperConnector'

describe('Component > ClassifierWrapperConnector', function () {
  let wrapper
  let mockStore

  describe('after logging in', function () {
    before(function () {
      mockStore = initStore(true, {
        project: {
          configuration: {
            languages: ['en']
          },
          slug: 'Foo/Bar',
          strings: {
            display_name: 'Foobar'
          },
          links: {
            active_workflows: ['1']
          }
        },
        user: {
          id: '1',
          loadingState: asyncStates.success,
          login: 'testUser'
        }
      })
      wrapper = shallow(<ClassifierWrapperConnector mockStore={mockStore} />)
    })

    describe('classifier wrapper props', function () {
      it('should include collections', function () {
        expect(wrapper.props().collections).to.equal(mockStore.user.collections)
      })

      it('should include recents', function () {
        expect(wrapper.props().recents).to.equal(mockStore.user.recents)
      })

      it('should include your personal stats', function () {
        expect(wrapper.props().yourStats).to.equal(mockStore.user.personalization)
      })

      it('should include the project', function () {
        expect(wrapper.props().project).to.deep.equal(mockStore.project.toJSON())
      })

      it('should include the logged-in user', function () {
        expect(wrapper.props().user).to.equal(mockStore.user)
      })

      it('should include the theme mode', function () {
        expect(wrapper.props().mode).to.equal(mockStore.ui.mode)
      })
    })
  })
})
