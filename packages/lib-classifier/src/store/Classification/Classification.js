import cuid from 'cuid'
import { types, getSnapshot, getType } from 'mobx-state-tree'
import * as tasks from '@plugins/tasks'
import AnnotationsStore from '@store/AnnotationsStore'
import Resource from '@store/Resource'
import ClassificationMetadata  from './ClassificationMetadata'

const annotationModels = Object.values(tasks).map(task => task.AnnotationModel)

const Classification = types
  .model('Classification', {
    annotations: types.map(types.union(...annotationModels)),
    completed: types.optional(types.boolean, false),
    links: types.frozen({
      project: types.string,
      subjects: types.array(types.string),
      workflow: types.string
    }),
    metadata: types.maybe(ClassificationMetadata)
  })
  .views(self => ({
    toSnapshot () {
      let snapshot = getSnapshot(self)
      let annotations = []
      self.annotations.forEach(annotation => {
        annotations = annotations.concat(annotation.toSnapshot())
      })
      snapshot = Object.assign({}, snapshot, { annotations })
      return snapshot
    },

    // Use this to retrieve previous drawing or transcription task annotations.
    // Use the optional parameter to filter by the current active step drawing or transcription task
    previousInteractionTaskAnnotations (activeTaskKey) {
      const annotations = Array.from(self.annotations.values()) || []
      const interactionTaskAnnotations = annotations.filter(annotation => (getType(annotation).name === 'DrawingAnnotation' || getType(annotation).name === 'TranscriptionAnnotation'))
      return interactionTaskAnnotations.filter(annotation => annotation.task !== activeTaskKey)
    }
  }))
  .preProcessSnapshot(snapshot => {
    let newSnapshot = Object.assign({}, snapshot)
    // generate classification IDs, if not present
    newSnapshot.id = snapshot.id || cuid()
    // convert any annotations arrays to a map
    if (snapshot.annotations && Array.isArray(snapshot.annotations)) {
      const annotations = {}
      snapshot.annotations.forEach(annotation => {
        annotation.id = annotation.id || cuid()
        annotations[annotation.id] = annotation
      })
      newSnapshot.annotations = annotations
    }
    return newSnapshot
  })
  .postProcessSnapshot(snapshot => {
    const newSnapshot = Object.assign({}, snapshot)
    // convert annotations to an array
    newSnapshot.annotations = Object.values(snapshot.annotations)
    return newSnapshot
  })

export default types.compose('ClassificationResource', Resource, AnnotationsStore, Classification)
