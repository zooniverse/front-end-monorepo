import { types } from 'mobx-state-tree'

import numberString from '../types/numberString'

const Publication = types.model('Publication', {
  authors: types.maybeNull(types.string),
  id: types.identifier,
  title: types.string,
  url: types.maybeNull(types.string),
  year: types.maybeNull(numberString)
})

export default Publication
