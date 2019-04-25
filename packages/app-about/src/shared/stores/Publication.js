import { types } from 'mobx-state-tree'

const Publication = types.model('Publication', {
  category: types.model({
    name: types.string,
    weight: types.optional(types.number, 100)
  }),
  citation: types.string,
  date: types.string,
  id: types.identifier,
  project: types.model({
    name: types.string,
    slug: types.optional(types.string, '')
  }),
  url: types.optional(types.string, '')
})

export default Publication
