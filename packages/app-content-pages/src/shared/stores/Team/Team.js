import { types } from 'mobx-state-tree'

import Person from './Person'

const Team = types.model('Team', {
  id: types.identifier,
  name: types.maybeNull(types.string),
  people: types.array(types.reference(Person))
})

export default Team
