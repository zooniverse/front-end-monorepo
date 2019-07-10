import { types } from 'mobx-state-tree'

const Person = types.model('Person', {
  avatarSrc: types.maybeNull(types.string),
  bio: types.maybeNull(types.string),
  id: types.identifier,
  jobTitle: types.maybeNull(types.string),
  name: types.maybeNull(types.string),
  twitter: types.maybeNull(types.string)
})

export default Person
