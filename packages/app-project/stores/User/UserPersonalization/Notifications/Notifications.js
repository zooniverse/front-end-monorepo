import { flow, getRoot, types } from 'mobx-state-tree'
import { sugarClient } from 'panoptes-client/lib/sugar'
import auth from 'panoptes-client/lib/auth'
import talkClient from 'panoptes-client/lib/talk-client'
import asyncStates from '@zooniverse/async-states'

import getUnreadConversationsIds from './helpers/getTalkUnreadConversationsIds'

// NOTES
// This store is for the Notifications and Messages count displayed in ZooHeader.
// The ZooHeader Notifications count represents unread Talk notifications related to Talk comments, discussions, and messages.
// The ZooHeader Messages count represents unread Talk conversations.
// Unread Talk notifications related to Talk moderation reports are not included ZooHeader Notifications or ZooHeader Messages

const Notifications = types
  .model('Notifications', {
    unreadConversationsIds: types.array(types.string),
    unreadNotificationsCount: types.maybeNull(types.number),
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
        self.fetchInitialUnreadConversationsIds()
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
            self.unreadNotificationsCount = notification.getMeta()?.count
          }

          self.setLoadingState(asyncStates.success)
        } catch (error) {
          self.handleError(error)
        }
      }),

      fetchInitialUnreadConversationsIds: flow(function * fetchInitialUnreadConversationsIds () {
        self.setLoadingState(asyncStates.loading)
        try {
          const token = yield auth.checkBearerToken()
          const authorization = `Bearer ${token}`

          const unreadConversationsIds = yield getUnreadConversationsIds(authorization)

          if (unreadConversationsIds?.length) {
            self.unreadConversationsIds = unreadConversationsIds
          }

          self.setLoadingState(asyncStates.success)
        } catch (error) {
          self.handleError(error)
        }
      }),

      processSugarNotification (notification) {
        // sugar data objects with source_type = 'Message' are related to Talk messages, a subset of Talk conversations, and are included in ZooHeader Notifications
        // sugar data objects with source_type = 'Moderation' are related to Talk moderation reports and are not included in ZooHeader Notifications or ZooHeader Messages

        if (notification?.data.source_type !== 'Moderation') {
          self.unreadNotificationsCount = self.unreadNotificationsCount + 1
        }

        if (notification?.data.source_type === 'Message') {
          const conversationId = notification.data.url.split('/').pop()
          if (!self.unreadConversationsIds.includes(conversationId)) {
            self.unreadConversationsIds.push(conversationId)
          }
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
        self.messagesCount = null
        self.unreadNotificationsCount = null
        self.error = undefined
        this.setLoadingState(asyncStates.initialized)
      }
    }
  })

export default Notifications
