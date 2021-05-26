import { types } from 'mobx-state-tree'

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

export default UserProjectPreferences