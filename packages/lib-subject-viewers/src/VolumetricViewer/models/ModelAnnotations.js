import { SortedSet, SortedSetUnion } from './../helpers/SortedSet.js'

const THRESHOLD_DEFAULT = 15
let ANNOTATION_COUNT = 0

// Creates the base object for an Annotation
export const AnnotationBase = ({ point }) => {
  return {
    label: `Annotation ${++ANNOTATION_COUNT}`,
    threshold: THRESHOLD_DEFAULT,
    points: {
      active: [point], // each individual point
      connected: [], // SortedSet of points from each active point
      all: SortedSet({ data: [] }) // SortedSet of all connected points
    },
  }
}

export const ModelAnnotations = ({ onAnnotation }) => {
  const annotationModel = {
    annotations: [],
    config: {
      activeAnnotation: null, // index of annotation that is currently active
      algorithm: null,
      viewer: false
    },
    initialize: (config) => {
      annotationModel.config = {
        ...annotationModel.config,
        ...config
      }
    },
    actions: {
      annotation: {
        add: ({ point }) => {
          const annotationIndex = annotationModel.annotations.length
          const annotation = AnnotationBase({ point })

          // if algorithm, get connected points
          if (annotationModel.config.algorithm) {
            annotation.points.all = annotationModel.config.algorithm({
              annotation,
              point,
              viewer: annotationModel.config.viewer
            })

            annotation.points.connected[0] = annotation.points.all.data
          } else {
            annotation.points.connected[0] = []
          }

          // Update the Annotation Data
          annotationModel.annotations.push(annotation)
          annotationModel.config.activeAnnotation = annotationIndex

          // Update the Viewer Annotation Data
          annotationModel.config.viewer.setPointsAnnotationIndex({
            points: annotation.points.connected[0],
            index: annotationIndex
          })

          // Publish the change
          annotationModel.publish('add:annotation', {
            annotation,
            annotationIndex,
            annotations: annotationModel.annotations
          })

          // Send to update handler
          annotationModel.publishCallback()
        },
        active: ({ index }) => {
          // Do nothing if the same annotation
          if (annotationModel.config.activeAnnotation === index) return
          
          // Update the Annotation Data
          annotationModel.config.activeAnnotation = index

          // Publish the change
          annotationModel.publish('active:annotation', {
            annotationIndex: index,
            annotations: annotationModel.annotations
          })
        },
        remove: ({ index }) => {
          const annotation = annotationModel.annotations[index]

          for (let i = (annotation.points.active.length - 1); i >= 0; i--) {
            annotationModel.actions.point.undo({ index })
          }

          // Make sure a new annotation is created on next point
          annotationModel.config.activeAnnotation = null

          // Publish the change
          annotationModel.publish('update:annotation', {
            annotation,
            annotationIndex: index,
            annotations: annotationModel.annotations
          })

          // Send to update handler
          annotationModel.publishCallback()
        }
      },
      point: {
        add: ({ annotationIndex = null, point }) => {
          if (!point) return

          const currentIndex = annotationModel.config.viewer.getPointAnnotationIndex({ point })

          // point is already part of an active annotation. make active instead
          if (currentIndex !== -1)
            return annotationModel.actions.annotation.active({ index: currentIndex })

          // check if we have an active annotation
          if (
            annotationIndex === null &&
            annotationModel.config.activeAnnotation === null
          ) {
            annotationModel.actions.annotation.add({ point })
          } else {
            const _index = annotationIndex || annotationModel.config.activeAnnotation
            const annotation = annotationModel.annotations[_index]
            const pointIndex = annotation.points.active.length

            // if algorithm, get connected points
            const connectedPoints = annotationModel.config.algorithm
              ? annotationModel.config.algorithm({
                annotation,
                point,
                viewer: annotationModel.config.viewer
              })
              : SortedSet({ data: [] })

            // Update the Annotation Data
            annotation.points.active[pointIndex] = point
            annotation.points.connected[pointIndex] = connectedPoints.data
            annotation.points.all = SortedSetUnion({
              sets: [annotation.points.all, connectedPoints]
            })

            // Update the Viewer Annotation Data
            annotationModel.config.viewer.setPointsAnnotationIndex({
              points: annotation.points.connected[pointIndex],
              index: _index
            })

            // Publish the change
            annotationModel.publish('update:annotation', {
              annotation,
              annotationIndex: _index,
              annotations: annotationModel.annotations
            })

            // Send to update handler
            annotationModel.publishCallback()
          }
        },
        undo: ({ index }) => {
          const annotation = annotationModel.annotations[index]

          // Update the Viewer Annotation Data
          annotation.points.active.pop()

          const points = annotation.points.connected.pop()

          annotationModel.config.viewer.setPointsAnnotationIndex({
            points: points,
            index: -1
          })

          annotation.points.all.remove({ value: points })

          // Make sure a new annotation is created on next point
          if (annotation.points.active.length === 0) 
            annotationModel.config.activeAnnotation = null
            
          
          // Publish the change
          annotationModel.publish('update:annotation', {
            annotation,
            annotationIndex: index,
            annotations: annotationModel.annotations
          })

          // Send to update handler
          annotationModel.publishCallback()
        }
      }
    },
    publishCallback: () => {
      if (!onAnnotation) return

      const annotationExport = JSON.parse(JSON.stringify(annotationModel.annotations))
      annotationExport.forEach(a => { 
        a.points.all = a.points.all.data
      })
      onAnnotation(annotationExport)

    },
    export: () => {
      return annotationModel.annotations.map(annotation => {
        return {
          label: annotation.label,
          points: {
            active: [...annotation.points.active],
            connected: [...annotation.points.connected]
          },
          threshold: annotation.threshold
        }
      })
    },
    // Listeners
    _listeners: [],
    publish: (eventName, data) => {
      annotationModel._listeners.forEach((listener) => {
        if (listener.eventName === eventName) listener.cb(data)
      })
    },
    on: (eventName, cb) => {
      annotationModel._listeners.push({ eventName, cb })
    },
    off: (eventName, cb) => {
      const index = annotationModel._listeners.findIndex(
        (listener) => listener.eventName === eventName && listener.cb === cb
      )
      if (index > -1) annotationModel._listeners.splice(index, 1)
    }
  }

  return annotationModel
}
