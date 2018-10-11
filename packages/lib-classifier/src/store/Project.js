import { types } from 'mobx-state-tree'
import Resource from './Resource'

const Project = types
  .model({
    configuration: types.frozen(),
    display_name: types.string,
    links: types.frozen()
  })

export default types.compose('Project', Resource, Project)
