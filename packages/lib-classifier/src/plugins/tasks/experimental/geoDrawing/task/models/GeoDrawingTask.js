import cuid from 'cuid'
import { getRoot, types } from 'mobx-state-tree'
import Task from '../../../../models/Task'
import GeoDrawingAnnotation from './GeoDrawingAnnotation'
import * as features from '../../features/models'
import * as tools from '../../tools/models'

const featureModels = Object.values(features)
const GenericFeature = types.union(...featureModels)
const toolModels = Object.values(tools)
const GenericTool = types.union(...toolModels)

const GeoDrawing = types
  .model('GeoDrawing', {
    activeFeature: types.maybeNull(GenericFeature),
    activeToolIndex: types.optional(types.number, 0),
    annotation: types.safeReference(GeoDrawingAnnotation),
    required: types.maybe(types.union(types.string, types.boolean)),
    tools: types.array(GenericTool),
    type: types.literal('geoDrawing'),
    unit: types.optional(types.string, 'meters')
  })
  .volatile(() => ({
    activeOlFeature: null,
    mapExtentMeters: null
  }))
  .views(self => ({
    get activeTool () {
      return self.tools[self.activeToolIndex]
    },

    get drawnFeatures () {
      const annotation = getRoot(self)?.classifications?.annotation?.(self)
      return annotation?.value?.features ?? []
    },

    drawnCountForTool (toolIndex) {
      return self.drawnFeatures.filter(feature => feature?.properties?.toolIndex === toolIndex).length
    },

    defaultAnnotation(id = cuid()) {
      return GeoDrawingAnnotation.create({
        id,
        task: self.taskKey,
        taskType: self.type,
        value: null
      })
    },

    isComplete(annotation) {
      if (self.required && !annotation?.isComplete) return false

      const features = annotation?.value?.features ?? []
      for (let toolIndex = 0; toolIndex < self.tools.length; toolIndex++) {
        const tool = self.tools[toolIndex]
        const minLines = tool.min
        if (typeof minLines === 'number' && minLines > 0) {
          const matchingCount = features.filter((feature) => (
            feature?.properties?.toolIndex === toolIndex
          )).length
          if (matchingCount < minLines) return false
        }
      }

      return true
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

      setActiveFeature(feature) {
        self.activeFeature = feature
      },

      clearActiveFeature() {
        self.activeFeature = null
      },

      setActiveOlFeature(feature) {
        self.activeOlFeature = feature
      },

      clearActiveOlFeature() {
        self.activeOlFeature = null
      },

      setActiveFeatureUncertaintyRadius(radius) {
        const intRadius = Math.round(Number(radius))
        if (self.activeFeature?.properties) {
          self.activeFeature.properties.uncertainty_radius = intRadius
        }
        if (self.activeOlFeature?.set) {
          self.activeOlFeature.set('uncertainty_radius', intRadius)
          self.activeOlFeature.changed?.()
        }
      },

      setActiveFeatureGeometry(geometry) {
        if (self.activeFeature?.geometry && geometry) {
          const coordinates = geometry.getCoordinates?.()
          if (coordinates) {
            self.activeFeature.geometry.coordinates = coordinates
          }
        }
      },

      setMapExtent(extentInfo) {
        self.mapExtentMeters = extentInfo
      },

      setUnit(newUnit) {
        self.unit = newUnit
      },

      reset() {
        // model state
        self.activeFeature = null
        self.activeToolIndex = 0
        // volatile state
        self.activeOlFeature = null
        self.mapExtentMeters = null
        self.unit = 'meters'
      }
    })
  })

const GeoDrawingTask = types.compose('GeoDrawingTask', Task, GeoDrawing)

export default GeoDrawingTask
