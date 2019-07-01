import { types } from 'mobx-state-tree'

import Publication from './Publication'
import numberString from '../types/numberString'

const Project = types.model('Project', {
  avatarSrc: types.maybeNull(types.string),
  id: types.identifier,
  panoptesId: types.maybeNull(numberString),
  publications: types.array(types.reference(Publication)),
  title: types.string
})

export default Project
