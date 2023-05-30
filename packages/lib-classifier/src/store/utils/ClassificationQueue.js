// NOTE: This is a fallback queue in case either the service worker API
// and/or the loading of Google's Workbox fails to load.
// Also for browsers that do not support Background Sync API

import * as Sentry from '@sentry/browser'
import { panoptes } from '@zooniverse/panoptes-js'
import { getBearerToken } from './'

export const FAILED_CLASSIFICATION_QUEUE_NAME = 'failed-classifications'
export const MAX_RECENTS = 10
export const RETRY_INTERVAL = 5 * 60 * 1000

const DEFAULT_HANDLER = () => true
class ClassificationQueue {
  constructor(
    api = panoptes,
    onClassificationSaved = DEFAULT_HANDLER,
    authClient
  ) {
    this.storage = window.localStorage
    this.apiClient = api
    this.authClient = authClient
    this.onClassificationSaved = onClassificationSaved
    this.recents = []
    this.sending = []
    this.flushTimeout = null
    this.endpoint = '/classifications'
    this.flushToBackend = this.flushToBackend.bind(this)

    // flush any pending classifications from previous sessions.
    this.flushToBackend()
  }

  add(classification) {
    this.store(classification)
    return this.flushToBackend()
  }

  store(classification) {
    const queue = this._loadQueue()
    queue.push(classification)

    try {
      this._saveQueue(queue)
      console.info('Queued classifications:', queue.length)
    } catch (error) {
      console.error('Failed to queue classification:', error.message)
      Sentry.withScope((scope) => {
        scope.setTag('classificationQueue', 'storeFailed')
        scope.setExtra('classification', JSON.stringify(classification))
        Sentry.captureException(error)
      })
    }
  }

  remove(classification) {
    const queue = this._loadQueue()
    try {
      const newQueue = queue.filter(c => c.id !== classification.id)
      this._saveQueue(newQueue)
    } catch (error) {
      console.error(error.message)
      Sentry.withScope((scope) => {
        scope.setTag('classificationQueue', 'removeFailed')
        scope.setExtra('classification', JSON.stringify(classification))
        Sentry.captureException(error)
      })
    }
  }

  length() {
    return this._loadQueue().length
  }

  addRecent(classification) {
    if (this.recents.length > MAX_RECENTS) {
      const droppedClassification = this.recents.pop()
      droppedClassification.destroy()
    }

    this.recents.unshift(classification)
  }

  async flushToBackend() {
    const pendingClassifications = this._loadQueue()
    if (this.flushTimeout) {
      clearTimeout(this.flushTimeout)
      this.flushTimeout = null
    }

    console.log('Saving queued classifications:', pendingClassifications.length)
    const authorization = await getBearerToken(this.authClient)
    // generate an array of promises, one for each classification
    const saveClassification = classificationData => this._saveClassification(classificationData, authorization)
    const awaitSaveClassifications = pendingClassifications
      .filter(c => !this.sending.includes(c.id))
      .map(saveClassification)
    return Promise.all(awaitSaveClassifications)
  }

  async _saveClassification(classificationData, authorization) {
    try {
      const { id, ...classificationToSave } = classificationData
      this.sending.push(id)
      const response = await this.apiClient.post(this.endpoint, { classifications: classificationToSave }, { authorization })
      if (response.ok) {
        this.remove(classificationData)
        const [savedClassification] = response.body.classifications
        console.log('Saved classification', savedClassification.id)
        this.onClassificationSaved(savedClassification)
        this.addRecent(savedClassification)
      }
      this.sending = this.sending.filter(id => id !== classificationData.id)
      return response
    } catch (error) {
      console.error('Failed to save a queued classification:', error.message)
      this.sending = this.sending.filter(id => id !== classificationData.id)

      if (error.status !== 422) {
        try {
          if (!this.flushTimeout) {
            this.flushTimeout = setTimeout(this.flushToBackend, RETRY_INTERVAL)
          }
        } catch (saveQueueError) {
          console.error('Failed to update classification queue:', saveQueueError)
        }
      } else {
        console.error('Dropping malformed classification permanently', classificationData)
        this.remove(classificationData)
      }
      Sentry.withScope((scope) => {
        scope.setTag('classificationError', error.status)
        scope.setExtra('classification', JSON.stringify(classificationData))
        Sentry.captureException(error)
      })
      return error
    }
  }

  _loadQueue() {
    let queue = JSON.parse(this.storage.getItem(FAILED_CLASSIFICATION_QUEUE_NAME))

    if (queue === undefined || queue === null) {
      queue = []
    }

    return queue
  }

  _saveQueue(queue) {
    this.storage.setItem(FAILED_CLASSIFICATION_QUEUE_NAME, JSON.stringify(queue))
  }
}

export default ClassificationQueue
