import { flow, getRoot, types } from 'mobx-state-tree'
import { sugarClient } from 'panoptes-client/lib/sugar'
import talkClient from 'panoptes-client/lib/talk-client'
import asyncStates from '@zooniverse/async-states'

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
        // sugar data objects of source_type = 'Message' are related to Talk Conversations and the header nav item "Messages", not the header nav item "Notifications"
        // TODO: add nav item "Messages" count

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
