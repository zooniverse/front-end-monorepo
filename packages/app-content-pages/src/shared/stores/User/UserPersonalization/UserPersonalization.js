import { types } from 'mobx-state-tree'

import Notifications from './Notifications'

const UserPersonalization = types
  .model('UserPersonalization', {
    notifications: types.optional(Notifications, {})
  })
  .actions(self => {
    return {
      load() {
        self.notifications.fetchAndSubscribe()
      },

      reset() {
        self.notifications.reset()
      }
    }
  })

export default UserPersonalization
