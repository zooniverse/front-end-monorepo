import { types } from 'mobx-state-tree'

import Project from './Project'

const Category = types.model('Category', {
  id: types.identifier,
  projects: types.array(types.reference(Project)),
  slug: types.string,
  title: types.string
})

export default Category
