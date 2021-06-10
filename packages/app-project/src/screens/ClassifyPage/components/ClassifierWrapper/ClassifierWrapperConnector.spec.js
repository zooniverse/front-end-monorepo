import { shallow } from 'enzyme'
import { MobXProviderContext } from 'mobx-react'
import sinon from 'sinon'
import React from 'react'
import asyncStates from '@zooniverse/async-states'

import initStore from '@stores/initStore'
import ClassifierWrapper from './ClassifierWrapper'
import ClassifierWrapperConnector from './ClassifierWrapperConnector'

describe('Component > ClassifierWrapperConnector', function () {
  let wrapper
  let store

  describe('while logging in', function () {
    before(function () {
      store = initStore()
      sinon.stub(React, 'useContext')
        .withArgs(MobXProviderContext)
        .returns({ store })
      wrapper = shallow(<ClassifierWrapperConnector />)
    })

    after(function () {
      React.useContext.restore()
    })

    it('should show a signing in message',function () {
      expect(wrapper.text()).to.equal('Signing in…')
    })
  })

  describe('after logging in', function () {
    before(function () {
      store = initStore(true, {
        user: {
          id: '1',
          loadingState: asyncStates.success,
          login: 'testUser'
        }
      })
      sinon.stub(React, 'useContext')
        .withArgs(MobXProviderContext)
        .returns({ store })
      wrapper = shallow(<ClassifierWrapperConnector />)
    })

    after(function () {
      React.useContext.restore()
    })

    describe('classifier wrapper props', function () {
      it('should include collections', function () {
        expect(wrapper.props().collections).to.equal(store.collections)
      })

      it('should include recents', function () {
        expect(wrapper.props().recents).to.equal(store.recents)
      })

      it('should include your personal stats', function () {
        expect(wrapper.props().yourStats).to.equal(store.yourStats)
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
