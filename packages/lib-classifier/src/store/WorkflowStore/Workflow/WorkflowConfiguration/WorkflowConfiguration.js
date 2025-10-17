import { types } from 'mobx-state-tree'
import subjectViewers from '@helpers/subjectViewers'

const WorkflowConfiguration = types.snapshotProcessor(
  types.model({
    enable_caesar_data_fetching: types.optional(types.boolean, false),
    enable_switching_flipbook_and_separate: types.optional(types.boolean, false),
    flipbook_autoplay: types.optional(types.boolean, false),
    invert_subject: types.optional(types.boolean, false),
    limit_subject_height: types.optional(types.boolean, false),
    multi_image_clone_markers: types.optional(types.boolean, false),
    multi_image_mode: types.optional(types.enumeration('multiImageMode', ['flipbook', 'separate']), 'flipbook'),
    multi_image_layout: types.optional(types.enumeration('multiImageLayout', ['col', 'grid2', 'grid3', 'row']), 'col'),
    playIterations: types.optional(types.number, 3),
    subject_viewer: types.maybe(
      types.enumeration('subjectViewer', [
        'dataImage',
        'flipbook',
        'jsonData',
        'lightcurve',
        'multiFrame',
        'scatterPlot',
        'singleImage',
        'subjectGroup',
        'variableStar',
        'ztm2025geomap'
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
          case 'jsonData': {
            return subjectViewers.jsonData
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
          case 'ztm2025geomap': {
            return subjectViewers.ztm2025geomap
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
