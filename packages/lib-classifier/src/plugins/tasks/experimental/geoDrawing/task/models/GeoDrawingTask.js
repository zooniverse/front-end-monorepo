import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../../../models/Task'
import GeoDrawingAnnotation from './GeoDrawingAnnotation'
import * as tools from '../../tools/models'

const toolModels = Object.values(tools)
const GenericTool = types.union(...toolModels)

const GeoDrawing = types.model('GeoDrawing', {
  annotation: types.safeReference(GeoDrawingAnnotation),
  required: types.maybe(types.union(types.string, types.boolean)),
  tools: types.array(GenericTool),
  type: types.literal('geoDrawing')
})
  .views(self => ({
    defaultAnnotation(id = cuid()) {
      return GeoDrawingAnnotation.create({
        id,
        task: self.taskKey,
        taskType: self.type,
        value: []
      })
    }
  }))

const GeoDrawingTask = types.compose('GeoDrawingTask', Task, GeoDrawing)

export default GeoDrawingTask
