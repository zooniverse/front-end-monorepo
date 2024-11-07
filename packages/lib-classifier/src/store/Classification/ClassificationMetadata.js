import { autorun } from 'mobx'
import { addDisposer, getRoot, types } from 'mobx-state-tree'

const ClassificationMetadata = types.model('ClassificationMetadata', {
  classifier_version: types.literal('2.0'),
  feedback: types.frozen({}),
  finishedAt: types.maybe(types.string),
  revision: types.frozen(process.env.COMMIT_ID),
  session: types.maybe(types.string),
  source: types.enumeration(['api', 'sugar']),
  startedAt: types.optional(types.string, ''),
  subjectDimensions: types.array(types.frozen({
    clientHeight: types.integer,
    clientWidth: types.integer,
    naturalHeight: types.integer,
    naturalWidth: types.integer
  })),
  subjectSelectionState: types.frozen({
    already_seen: types.optional(types.boolean, false),
    finished_workflow: types.optional(types.boolean, false),
    retired: types.optional(types.boolean, false),
    selected_at: types.maybe(types.string),
    selection_state: types.maybe(types.string),
    user_has_finished_workflow: types.optional(types.boolean, false)
  }),
  subject_flagged: types.optional(types.boolean, false),
  userAgent: types.optional(types.string, navigator.userAgent),
  userLanguage: types.string,
  utcOffset: types.optional(types.string, ((new Date()).getTimezoneOffset() * 60).toString()),
  viewport: types.frozen({
    height: types.optional(types.integer, window.innerHeight),
    width: types.optional(types.integer, window.innerWidth)
  }),
  workflowVersion: types.string
})
  .actions(self => ({
    afterAttach() {
      function _onLocaleChange() {
        const userLanguage = getRoot(self)?.locale
        if (userLanguage) {
          self.update({ userLanguage })
        }
      }
      addDisposer(self, autorun(_onLocaleChange))
    },

    afterCreate() {
      const now = new Date()
      self.startedAt = now.toISOString()
    },

    update(newMetadata) {
      Object.entries(newMetadata).forEach(([key, value]) => {
        self[key] = value
      })
    }
  }))

export default ClassificationMetadata
  