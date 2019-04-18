import { types } from 'mobx-state-tree'

const Person = types.model('Person', {
  bio: types.string,
  id: types.identifier,
  jobTitle: types.string,
  name: types.string,
  team: types.string,
  twitterId: types.optional(types.string, ''),
})

export default Person
