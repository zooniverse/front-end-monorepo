import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../../models/Task'
import GeoDrawingAnnotation from './GeoDrawingAnnotation'

const GeoPointTool = types.model('GeoPointTool', {
  label: types.string,
  max: types.union(types.number, types.string),
  min: types.union(types.number, types.string),
  type: types.literal('geoPoint')
})

const GeoDrawing = types.model('GeoDrawing', {
  annotation: types.safeReference(GeoDrawingAnnotation),
  required: types.maybe(types.union(types.string, types.boolean)),
  tools: types.array(GeoPointTool),
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
