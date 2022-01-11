import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { GraphQLClient } from 'graphql-request'
import { Button, Paragraph } from 'grommet'
import makeInspectable from 'mobx-devtools-mst'
import { Provider } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo } from 'react'
import zooTheme from '@zooniverse/grommet-theme'
import {
  env,
  panoptes as panoptesClient,
  projects as projectsClient,
  tutorials as tutorialsClient
} from '@zooniverse/panoptes-js'

import { unregisterWorkers } from '../../workers'
import RootStore from '../../store'
import Layout from './components/Layout'
import ModalTutorial from './components/ModalTutorial'

const dsn = process.env.SENTRY_CLASSIFIER_DSN
const environment = process.env.APP_ENV
const release = process.env.COMMIT_ID

if (dsn) {
  Sentry.init({
    dsn,
    environment,
    integrations: [new Integrations.BrowserTracing()],
    release,
    tracesSampleRate: 0.01,
  })
}

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

let store

function initStore({ authClient, client, initialState }) {
  if (!store) {
    store = RootStore.create(initialState, {
      authClient,
      client
    })
    makeInspectable(store)
  }
  return store
}
/**
  useStore hook adapted from
  https://github.com/vercel/next.js/blob/5201cdbaeaa72b54badc8f929ddc73c09f414dc4/examples/with-mobx-state-tree/store.js#L49-L52
*/
function useStore({ authClient, client, initialState }) {
  const _store = useMemo(() => initStore({ authClient, client, initialState }), [authClient, initialState])
  return _store
}

export default function Classifier({
  authClient,
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
    initialState: {
      projects: {
        active: project.id,
        resources: {
          [project.id]: project
        }
      }
    }
  })

  const {
    classifications,
    projects,
    subjects,
    userProjectPreferences,
    workflows
  } = classifierStore

  useEffect(function onMount() {
    classifierStore.setOnAddToCollection(onAddToCollection)
    classifications.setOnComplete(onCompleteClassification)
    classifierStore.setOnSubjectChange(onSubjectChange)
    subjects.setOnReset(onSubjectReset)
    classifierStore.setOnToggleFavourite(onToggleFavourite)
  }, [])

  useEffect(function onProjectChange() {
    if (project.id) {
      projects.setResources([project])
      projects.setActive(project.id)
    }
  }, [project.id])

  useEffect(function onURLChange() {
    if (workflowID) {
      workflows.selectWorkflow(workflowID, subjectSetID, subjectID)
    }
  }, [subjectID, subjectSetID, workflowID])

  useEffect(function onAuthChange() {
    userProjectPreferences.checkForUser()
  }, [authClient])

  try {
    return (
      <Provider classifierStore={classifierStore}>
          <Sentry.ErrorBoundary fallback={ErrorFallback}>
            <Layout />
            <ModalTutorial />
          </Sentry.ErrorBoundary>
      </Provider>
    )
  } catch (error) {
    Sentry.captureException(error)
    return <p>An error occurred. {error.message}</p>
  }
}

Classifier.propTypes = {
  authClient: PropTypes.object.isRequired,
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

function ErrorFallback({ error, componentStack, resetError }) {
  return (
    <>
      <Paragraph>An error has occurred.</Paragraph>
      <Paragraph>{ error.message }</Paragraph>
      <Button
        label="Restart"
        onClick={resetError}
      />
      <pre>{componentStack}</pre>
    </>
  )
}
