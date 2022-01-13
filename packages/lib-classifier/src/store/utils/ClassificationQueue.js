// NOTE: This is a fallback queue in case either the service worker API
// and/or the loading of Google's Workbox fails to load.
// Also for browsers that do not support Background Sync API

import * as Sentry from '@sentry/browser'
import { panoptes } from '@zooniverse/panoptes-js'
import { getBearerToken } from './'

const FAILED_CLASSIFICATION_QUEUE_NAME = 'failed-classifications'
const MAX_RECENTS = 10
const RETRY_INTERVAL = 5 * 60 * 1000

class ClassificationQueue {
  constructor (api, onClassificationSaved, authClient) {
    this.storage = window.localStorage
    this.apiClient = api || panoptes
    this.authClient = authClient
    this.recents = []
    this.flushTimeout = null
    this.onClassificationSaved = onClassificationSaved || function () { return true }
    this.endpoint = '/classifications'
  }

  add (classification) {
    this.store(classification)
    return this.flushToBackend()
  }

  store (classification) {
    const queue = this._loadQueue()
    queue.push(classification)

    try {
      this._saveQueue(queue)
      if (process.env.NODE_ENV !== 'test') console.info('Queued classifications:', queue.length)
    } catch (error) {
      if (process.env.NODE_ENV !== 'test') console.error('Failed to queue classification:', error)
      Sentry.withScope((scope) => {
        scope.setExtra('classification', JSON.stringify(classification))
        Sentry.captureException(error)
      })
    }
  }

  length () {
    return this._loadQueue().length
  }

  addRecent (classification) {
    if (this.recents.length > MAX_RECENTS) {
      const droppedClassification = this.recents.pop()
      droppedClassification.destroy()
    }

    this.recents.unshift(classification)
  }

  async flushToBackend () {
    const pendingClassifications = this._loadQueue()
    const failedClassifications = []
    this._saveQueue(failedClassifications)
    if (this.flushTimeout) {
      clearTimeout(this.flushTimeout)
      this.flushTimeout = null
    }

    if (process.env.NODE_ENV !== 'test') console.log('Saving queued classifications:', pendingClassifications.length)
    const authorization = await getBearerToken(this.authClient)
    // generate an array of promises, one for each classification
    const awaitSaveClassifications = pendingClassifications.map((classificationData) => {
      this._saveClassification(classificationData, authorization)
    })
    return Promise.all(awaitSaveClassifications)
  }

  async _saveClassification(classificationData, authorization) {
    let response
    try {
      response = await this.apiClient.post(this.endpoint, { classifications: classificationData }, { authorization })
      if (response.ok) {
        const savedClassification = response.body.classifications[0]
        if (process.env.NODE_ENV !== 'test') console.log('Saved classification', savedClassification.id)
        this.onClassificationSaved(savedClassification)
        this.addRecent(savedClassification)
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'test') console.error('Failed to save a queued classification:', error)

      if (error.status !== 422) {
        try {
          this.store(classificationData)
          if (!this.flushTimeout) {
            this.flushTimeout = setTimeout(this.flushToBackend.bind(this), RETRY_INTERVAL)
          }
        } catch (saveQueueError) {
          console.error('Failed to update classification queue:', saveQueueError)
        }
      } else {
        console.error('Dropping malformed classification permanently', classificationData)
        Sentry.withScope((scope) => {
          scope.setExtra('classification', JSON.stringify(classificationData))
          Sentry.captureException(error)
        })
      }
    }
    return response
  }

  _loadQueue () {
    let queue = JSON.parse(this.storage.getItem(FAILED_CLASSIFICATION_QUEUE_NAME))

    if (queue === undefined || queue === null) {
      queue = []
    }

    return queue
  }

  _saveQueue (queue) {
    this.storage.setItem(FAILED_CLASSIFICATION_QUEUE_NAME, JSON.stringify(queue))
  }
}

export default ClassificationQueue
