import { GraphQLClient } from 'graphql-request'
import { Paragraph } from 'grommet'
import { Provider } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import '../../translations/i18n'
import i18n from 'i18next'
import {
  env,
  panoptes as panoptesClient,
  projects as projectsClient,
  tutorials as tutorialsClient
} from '@zooniverse/panoptes-js'

import { useHydratedStore, useStore, useWorkflowSnapshot } from './hooks'
import { unregisterWorkers } from '../../workers'
import Classifier from './Classifier'

// import { isBackgroundSyncAvailable } from '../../helpers/featureDetection'
function caesarClient (env) {
  switch (env) {
    case 'production': {
      return new GraphQLClient('https://caesar.zooniverse.org/graphql')
    }
    default: {
      return new GraphQLClient('https://caesar-staging.zooniverse.org/graphql')
    }
  }
}

const client = {
  caesar: caesarClient(env),
  panoptes: panoptesClient,
  projects: projectsClient,
  tutorials: tutorialsClient
}

// We don't register the queue service worker if background sync API is not available
// We might want to move this check elsewhere once we add other service workers for other tasks
// if (isBackgroundSyncAvailable()) registerWorkers()

// TODO: The workbox background sync queue isn't working as expected
// It doesn't work with superagent/XHR req for interception
// We need to migrate to fetch API, otherwise the POST will occur twice
// Once in our store, once in the worker
// So we'll unregister the worker for now.
unregisterWorkers('./queue.js')

export default function ClassifierContainer({
  authClient,
  cachePanoptesData = false,
  locale,
  onAddToCollection = () => true,
  onCompleteClassification = () => true,
  onError = () => true,
  onSubjectChange = () => true,
  onSubjectReset = () => true,
  onToggleFavourite = () => true,
  project,
  subjectID,
  subjectSetID,
  workflowID
}) {

  const classifierStore = useStore({
    authClient,
    client,
    initialState: {}
  })

  const workflowSnapshot = useWorkflowSnapshot(workflowID)

  const loaded = useHydratedStore( classifierStore, cachePanoptesData,`fem-classifier-${project.id}`)

  useEffect(function onLoad() {
    /*
    This should run after the store is created and hydrated.
    Otherwise, hydration will overwrite the callbacks with
    their defaults.
    */
    if (loaded) {
      console.log('setting classifier event callbacks')
      const { classifications, subjects } = classifierStore
      classifierStore.setOnAddToCollection(onAddToCollection)
      classifications.setOnComplete(onCompleteClassification)
      classifierStore.setOnSubjectChange(onSubjectChange)
      subjects.setOnReset(onSubjectReset)
      classifierStore.setOnToggleFavourite(onToggleFavourite)
    }
  }, [loaded])

  useEffect(function onAuthChange() {
    if (loaded) {
      classifierStore.userProjectPreferences.checkForUser()
    }
  }, [loaded, authClient])

  try {
    if (loaded) {

      return (
        <Provider classifierStore={classifierStore}>
          <Classifier
            classifierStore={classifierStore}
            locale={locale}
            onError={onError}
            project={project}
            subjectSetID={subjectSetID}
            subjectID={subjectID}
            workflowSnapshot={workflowSnapshot}
            workflowVersion={workflowSnapshot?.version}
            workflowID={workflowSnapshot?.id}
          />
        </Provider>
      )
    }

    return <Paragraph>Loading…</Paragraph>
  } catch (error) {
    const info = {
      package: '@zooniverse/classifier'
    }
    onError(error, info);
  }
  return null
}

ClassifierContainer.propTypes = {
  authClient: PropTypes.object.isRequired,
  cachePanoptesData: PropTypes.bool,
  locale: PropTypes.string,
  mode: PropTypes.string,
  onAddToCollection: PropTypes.func,
  onCompleteClassification: PropTypes.func,
  onError: PropTypes.func,
  onSubjectReset: PropTypes.func,
  onToggleFavourite: PropTypes.func,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  theme: PropTypes.object
}
