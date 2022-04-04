import React from 'react'
import { renderHook } from '@testing-library/react-hooks/pure'
import { Provider } from 'mobx-react'

import mockStore from '@test/mockStore'
import { useStores } from '.'

describe('Hooks > useStores', function () {
  describe('without storeMapper', function () {
    let current
    let store

    before(function () {
      store = mockStore()
      const wrapper = props => (
        <Provider classifierStore={store}>
          {props.children}
        </Provider>
      )
      const { result } = renderHook(() => useStores(), { wrapper })
      current = result.current
    })

    it('should return the complete store', function () {
      expect(current).to.deep.equal(store)
    })
  })

  describe('with storeMapper', function () {
    let current
    let store
    function storeMapper(store) {
      const {
        workflows: {
          loadingState: workflowReadyState
        }
      } = store
      return { workflowReadyState }
    }

    before(function () {
      store = mockStore()
      const wrapper = props => (
        <Provider classifierStore={store}>
          {props.children}
        </Provider>
      )
      const { result } = renderHook(() => useStores(storeMapper), { wrapper })
      current = result.current
    })

    it('should only return filtered properties', function () {
      const workflowReadyState = store.workflows.loadingState
      expect(current).to.deep.equal({ workflowReadyState })
    })
  })
})