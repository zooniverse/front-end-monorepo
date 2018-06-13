import { flow, getRoot, types } from 'mobx-state-tree'
import asyncStates from 'src/helpers/asyncStates'
import numberString from './types/numberString'

const Resource = types
  .model('Resource', {
    id: types.identifier(numberString),
  })

export default Resource
