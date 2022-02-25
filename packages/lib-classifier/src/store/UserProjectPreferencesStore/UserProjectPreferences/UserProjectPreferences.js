import { types } from 'mobx-state-tree'
import Resource from '@store/Resource'

const Preferences = types
  .model('Preferences', {
    minicourses: types.maybe(types.frozen()),
    selected_workflow: types.maybe(types.string),
    tutorials_completed_at: types.maybe(types.frozen())
  })

const UserProjectPreferences = types
  .model('UserProjectPreferences', {
    activity_count: types.maybe(types.number),
    activity_count_by_workflow: types.maybe(types.frozen()),
    links: types.maybe(
      types.frozen({
        project: types.string,
        user: types.string
      })
    ),
    preferences: types.maybe(Preferences),
    settings: types.maybe(types.frozen())
  })

export default types.compose('UserProjectPreferencesResource', Resource, UserProjectPreferences)
