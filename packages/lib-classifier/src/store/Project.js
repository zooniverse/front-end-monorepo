import { types } from 'mobx-state-tree'
import Resource from './Resource'

const Project = types
  .model('Project', {
    configuration: types.frozen({}),
    display_name: types.string,
    experimental_tools: types.frozen({}),
    links: types.frozen({})
  })

export default types.compose('ProjectResource', Resource, Project)
