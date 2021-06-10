import { shallow } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import asyncStates from '@zooniverse/async-states'

import initStore from '@stores/initStore'
import ClassifierWrapperContainer, { storeMapper } from './ClassifierWrapperContainer'

describe('Component > ClassifierWrapperContainer', function () {
  describe('storeMapper', function () {
    let props
    let store

    before(function () {
      store = initStore()
      props = storeMapper(store)
    })

    it('should return collections', function () {
      expect(props.collections).to.equal(store.collections)
    })

    it('should return recents', function () {
      expect(props.recents).to.equal(store.recents)
    })

    it('should return your personal stats', function () {
      expect(props.yourStats).to.equal(store.yourStats)
    })

    it('should return the project', function () {
      expect(props.project).to.equal(store.project)
    })

    it('should return the logged-in user', function () {
      expect(props.user).to.equal(store.user)
    })

    it('should return the theme mode', function () {
      expect(props.mode).to.equal(store.ui.mode)
    })
  })
})
