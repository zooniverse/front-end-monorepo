import { types } from 'mobx-state-tree'
import numberString from './types/numberString'

const Resource = types
  .model('Resource', {
    id: types.identifier(numberString)
  })

export default Resource
