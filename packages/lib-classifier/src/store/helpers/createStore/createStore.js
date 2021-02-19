import asyncStates from '@zooniverse/async-states'
import { types } from 'mobx-state-tree'
import RootStore from '../../RootStore'

export default function createStore(snapshot = {}) {
  const store = RootStore.create(snapshot)
  return store
}
