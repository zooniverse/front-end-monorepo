import { shallow } from 'enzyme'
import { MobXProviderContext } from 'mobx-react'
import sinon from 'sinon'
import React from 'react'
import asyncStates from '@zooniverse/async-states'

import initStore from '@stores/initStore'
import ClassifierWrapper from './ClassifierWrapper'
import ClassifierWrapperContainer from './ClassifierWrapperContainer'

describe('Component > ClassifierWrapperContainer', function () {
  let wrapper
  let store

  before(function () {
    store = initStore()
    sinon.stub(React, 'useContext')
      .withArgs(MobXProviderContext)
      .returns({ store })
    wrapper = shallow(<ClassifierWrapperContainer />)
  })

  after(function () {
    React.useContext.restore()
  })

  it('should return collections', function () {
    expect(wrapper.props().collections).to.equal(store.collections)
  })

  it('should return recents', function () {
    expect(wrapper.props().recents).to.equal(store.recents)
  })

  it('should return your personal stats', function () {
    expect(wrapper.props().yourStats).to.equal(store.yourStats)
  })

  it('should return the project', function () {
    expect(wrapper.props().project).to.deep.equal(store.project)
  })

  it('should return the logged-in user', function () {
    expect(wrapper.props().user).to.equal(store.user)
  })

  it('should return the theme mode', function () {
    expect(wrapper.props().mode).to.equal(store.ui.mode)
  })
})
