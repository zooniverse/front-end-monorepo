import { GraphQLClient } from 'graphql-request'
import { Paragraph } from 'grommet'
import { Provider } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import '../../translations/i18n'
import {
  env,
  panoptes as panoptesClient,
  projects as projectsClient,
  tutorials as tutorialsClient
} from '@zooniverse/panoptes-js'

import { useHydratedStore, usePanoptesTranslations, useWorkflowSnapshot } from '@hooks'
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
  showTutorial=false,
  subjectID,
  subjectSetID,
  workflowID
}) {
  const [loaded, setLoaded] = useState(false)
  const storeEnvironment = { authClient, client }

  const workflowSnapshot = useWorkflowSnapshot(workflowID)
  const workflowTranslation = usePanoptesTranslations({
    translated_id: workflowID,
    translated_type: 'workflow',
    language: locale
  })
  if (workflowSnapshot && workflowTranslation) {
    workflowSnapshot.strings = workflowTranslation.strings
  }

  const classifierStore = useHydratedStore(storeEnvironment, cachePanoptesData, `fem-classifier-${project.id}`)

  useEffect(function onMount() {
    /*
    If the project uses session storage, we need to do some
    processing of the store after it loads.
    */
    if (cachePanoptesData) {
      const { subjects, workflows } = classifierStore
      if (!workflows.active?.prioritized) {
        /*
        In this case, we delete the saved queue so that
        refreshing the classifier will load a new, randomised
        subject queue.
        */
        console.log('randomising the subject queue.')
        subjects.reset()
        subjects.advance()
      }
      if (subjects.active) {
        /*
          This is a hack to start a new classification from a snapshot.
        */
        console.log('store hydrated with active subject', subjects.active.id)
        classifierStore.startClassification()
      }
    }
    /*
    This should run after the store is created and hydrated.
    Otherwise, hydration will overwrite the callbacks with
    their defaults.
    */
    const { classifications, subjects, userProjectPreferences } = classifierStore
    console.log('resetting stale user data')
    userProjectPreferences.reset()
    console.log('setting classifier event callbacks')
    classifications.setOnComplete(onCompleteClassification)
    subjects.setOnReset(onSubjectReset)
    classifierStore.setOnAddToCollection(onAddToCollection)
    classifierStore.setOnSubjectChange(onSubjectChange)
    classifierStore.setOnToggleFavourite(onToggleFavourite)
    setLoaded(true)
  }, [])

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
            showTutorial={showTutorial}
            subjectSetID={subjectSetID}
            subjectID={subjectID}
            workflowSnapshot={workflowSnapshot}
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
  showTutorial: PropTypes.bool,
  theme: PropTypes.object
}
