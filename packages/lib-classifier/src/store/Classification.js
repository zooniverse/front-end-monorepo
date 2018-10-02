import { types } from 'mobx-state-tree'
import Resource from './Resource'
import { SingleChoiceAnnotation, MultipleChoiceAnnotation } from './annotations'

const Classification = types
  .model('Classification', {
    annotations: types.array(types.union({
      dispatcher: (snapshot) => {
        if (snapshot.type === 'SingleChoiceAnnotation') return SingleChoiceAnnotation
        if (snapshot.type === 'MultipleChoiceAnnotation') return MultipleChoiceAnnotation
      }
    }, SingleChoiceAnnotation, MultipleChoiceAnnotation)),
    completed: types.optional(types.boolean, false),
    links: types.frozen({
      project: types.string,
      subjects: types.array(types.string),
      workflow: types.string
    }),
    metadata: types.frozen({
      finished_at: types.maybe(types.string),
      session: types.string,
      source: types.enumeration(['api', 'sugar']),
      started_at: types.optional(types.string, (new Date()).toISOString()),
      subject_dimensions: types.frozen({
        clientHeight: types.integer,
        clientWidth: types.integer,
        naturalHeight: types.integer,
        naturalWidth: types.integer
      }),
      user_agent: types.optional(types.string, navigator.userAgent),
      user_language: types.string,
      utc_offset: types.optional(types.string, ((new Date()).getTimezoneOffset() * 60).toString()),
      viewport: {
        height: types.optional(types.integer, window.innerHeight),
        width: types.optional(types.integer, window.innerWidth)
      },
      workflow_version: types.string
    }),
  })

export default types.compose(Resource, Classification)