import { types } from 'mobx-state-tree'
import subjectViewers from '@helpers/subjectViewers'

const WorkflowConfiguration = types.snapshotProcessor(
  types.model({
    enable_switching_flipbook_and_separate: types.optional(types.boolean, false),
    invert_subject: types.optional(types.boolean, false),
    multi_image_mode: types.optional(types.enumeration('multiImageMode', ['flipbook', 'separate']), 'flipbook'),
    persist_annotations: types.optional(types.boolean, true),
    playIterations: types.optional(types.union(types.string, types.number), 3),
    subject_viewer: types.maybe(
      types.enumeration('subjectViewer', [
        'dataImage',
        'flipbook',
        'lightcurve',
        'multiFrame',
        'scatterPlot',
        'singleImage',
        'subjectGroup',
        'variableStar'
      ])
    ),
    subject_viewer_config: types.maybe(
      types.frozen({
        zoomConfiguration: types.maybe(
          types.frozen({
            direction: types.enumeration(['both', 'x', 'y']),
            minZoom: types.number,
            maxZoom: types.number,
            zoomInValue: types.number,
            zoomOutValue: types.number
          })
        )
      })
    )
  })
    .views(self => ({
      get viewerType() {
        switch (self.subject_viewer) {
          case 'dataImage': {
            return subjectViewers.dataImage
          }
          case 'flipbook': {
            return subjectViewers.flipbook
          }
          case 'lightcurve': {
            return subjectViewers.lightCurve
          }
          case 'multiFrame': {
            return subjectViewers.multiFrame
          }
          case 'scatterPlot': {
            return subjectViewers.scatterPlot
          }
          case 'singleImage': {
            return subjectViewers.singleImage
          }
          case 'subjectGroup': {
            return subjectViewers.subjectGroup
          }
          case 'variableStar': {
            return subjectViewers.variableStar
          }
          default: {
            return null
          }
        }
      }
    })),

  {
    preProcessor(snapshot) {
      const newSnapshot = Object.assign({}, snapshot)
      if (typeof snapshot?.playIterations === 'string') {
        if (snapshot?.playIterations.length) {
          const newIterations = Number(snapshot.playIterations)
          newSnapshot.playIterations = newIterations
        } else {
          newSnapshot.playIterations = Infinity
        }
      }
      return newSnapshot
    }
  }
)

export default WorkflowConfiguration
