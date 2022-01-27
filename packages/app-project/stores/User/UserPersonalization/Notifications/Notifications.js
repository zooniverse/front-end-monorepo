import { flow, getRoot, types } from 'mobx-state-tree'
import { sugarClient } from 'panoptes-client/lib/sugar'
import talkClient from 'panoptes-client/lib/talk-client'
import asyncStates from '@zooniverse/async-states'

// NOTES
// This store is for a Notifications count displayed in the ZooHeader.
// The ZooHeader can also display a Messages count.
// The ZooHeader Notifications count represents unread Talk notifications related to Talk comments and discussions
// The ZooHeader Messages count represents unread Talk notifications related to Talk messages (per a Talk conversation)
// Unread Talk notifications related to Talk moderation reports are not included ZooHeader Notifications or ZooHeader Messages

const Notifications = types
  .model('Notifications', {
    count: types.maybeNull(types.number),
    error: types.maybeNull(types.frozen({})),
    loadingState: types.optional(
      types.enumeration('state', asyncStates.values),
      asyncStates.initialized
    )
  })
  .actions(self => {
    return {
      fetchAndSubscribe () {
        self.fetchInitialUnreadNotifications()
        self.subscribeToSugarNotifications()
      },

      fetchInitialUnreadNotifications: flow(function * fetchInitialUnreadNotifications () {
        self.setLoadingState(asyncStates.loading)
        try {
          const query = {
            delivered: false,
            page_size: 1
          }

          const response = yield talkClient.type('notifications').get(query)
          const [notification] = response
          if (notification) {
            self.count = notification.getMeta()?.count
          }

          self.setLoadingState(asyncStates.success)
        } catch (error) {
          self.handleError(error)
        }
      }),

      processSugarNotification (notification) {
        // sugar data objects with source_type = 'Message' are related to Talk messages/conversations and included in ZooHeader Messages, not in ZooHeader Notifications
        // sugar data objects with source_type = 'Moderation' are related to Talk moderation reports and are not included in ZooHeader Notifications or ZooHeader Messages

        if (notification?.data.source_type !== 'Message' && notification?.data.source_type !== 'Moderation') {
          self.count = self.count + 1
        }
      },

      subscribeToSugarNotifications () {
        const { user } = getRoot(self)
        try {
          sugarClient.subscribeTo(`user:${user.id}`)
          sugarClient.on('notification', notification => self.processSugarNotification(notification))
        } catch (error) {
          self.handleError(error)
        }
      },

      unsubscribeFromSugarNotifications () {
        const { user } = getRoot(self)

        if (user) {
          try {
            sugarClient.unsubscribeFrom(`user:${user?.id}`)
          } catch (error) {
            self.handleError(error)
          }
        }
      },

      handleError (error) {
        console.error(error)
        self.error = error
        self.setLoadingState(asyncStates.error)
      },

      setLoadingState (state) {
        self.loadingState = state
      },

      reset () {
        this.unsubscribeFromSugarNotifications()
        self.count = undefined
        self.error = undefined
        this.setLoadingState(asyncStates.initialized)
      }
    }
  })

export default Notifications
