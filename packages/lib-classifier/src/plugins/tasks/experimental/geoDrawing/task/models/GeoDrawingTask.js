import cuid from 'cuid'
import { types } from 'mobx-state-tree'
import Task from '../../../../models/Task'
import GeoDrawingAnnotation from './GeoDrawingAnnotation'
import * as tools from '../../tools/models'

const toolModels = Object.values(tools)
const GenericTool = types.union(...toolModels)

const GeoDrawing = types.model('GeoDrawing', {
  activeToolIndex: types.optional(types.number, 0),
  annotation: types.safeReference(GeoDrawingAnnotation),
  required: types.maybe(types.union(types.string, types.boolean)),
  tools: types.array(GenericTool),
  type: types.literal('geoDrawing')
})
  .views(self => ({
    get activeTool () {
      return self.tools[self.activeToolIndex]
    },

    defaultAnnotation(id = cuid()) {
      return GeoDrawingAnnotation.create({
        id,
        task: self.taskKey,
        taskType: self.type,
        value: []
      })
    }
  }))
  .actions(self => {
    function _onToolChange() {
      if (self.activeToolIndex > -1) {
        self.validate()
      }
    }

    return ({
      afterCreate() {
        _onToolChange()
      },

      setActiveTool(index) {
        self.activeToolIndex = index
      },

      // TODO: reset()
    })
  })

const GeoDrawingTask = types.compose('GeoDrawingTask', Task, GeoDrawing)

export default GeoDrawingTask
