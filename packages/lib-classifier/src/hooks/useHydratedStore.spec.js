import { applySnapshot, getSnapshot } from 'mobx-state-tree'
import React from 'react'
import { renderHook } from '@testing-library/react-hooks/pure'

import mockStore from '@test/mockStore'
import RootStore from '@store/RootStore'
import { cleanStore } from './useHydratedStore'
import { useHydratedStore } from '.'

describe('Hooks > useHydratedStore', function () {
  describe('without an existing store', function () {
    let store

    beforeEach(function () {
      const { authClient, client } = mockStore()
      const { result } = renderHook(() => useHydratedStore({ authClient, client }, false, 'test-key'))
      store = result.current
    })

    afterEach(function () {
      cleanStore()
    })

    it('should create a new store', function () {
      const mockStore = getSnapshot(RootStore.create({}))
      const snapshot = getSnapshot(store)
      expect(snapshot).to.deep.equal(mockStore)
    })
  })

  describe('with an existing store', function () {
    let store
    let newStore

    beforeEach(function () {
      const { authClient, client } = mockStore()
      const { result: firstRun } = renderHook(() => useHydratedStore({ authClient, client }, false, 'test-key'))
      store = firstRun.current
      const { result: secondRun } = renderHook(() => useHydratedStore({ authClient, client }, false, 'test-key'))
      newStore = secondRun.current
    })

    afterEach(function () {
      cleanStore()
    })

    it('should use the existing store', function () {
      expect(newStore).to.deep.equal(store)
    })
  })

  describe('with session storage enabled', function () {
    let store

    beforeEach(function () {
      const expectedStore = mockStore()
      const { authClient, client } = expectedStore
      const { result } = renderHook(() => useHydratedStore({ authClient, client }, true, 'test-key'))
      store = result.current
      const mockSnapshot = getSnapshot(expectedStore)
      applySnapshot(store.projects, mockSnapshot.projects)
    })

    afterEach(function () {
      cleanStore()
    })

    it('should save snapshots in session storage', function () {
      const mockSnapshot = window.sessionStorage.getItem('test-key')
      const snapshot = getSnapshot(store)
      expect(JSON.stringify(snapshot)).to.equal(mockSnapshot)
    })
  })

  describe('with a saved snapshot', function () {
    let store
    let mockSnapshot

    beforeEach(function () {
      const expectedStore = mockStore()
      mockSnapshot = getSnapshot(expectedStore)
      window.sessionStorage.setItem('test-key', JSON.stringify(mockSnapshot))

      const { authClient, client } = expectedStore
      const { result } = renderHook(() => useHydratedStore({ authClient, client }, true, 'test-key'))
      store = result.current
    })

    afterEach(function () {
      cleanStore()
    })

    it('should load the snapshot into the store', function () {
      const snapshot = getSnapshot(store)
      expect(snapshot.projects).to.deep.equal(mockSnapshot.projects)
    })
  })
})