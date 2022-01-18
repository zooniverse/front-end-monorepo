import { GraphQLClient } from 'graphql-request'
import { Paragraph } from 'grommet'
import makeInspectable from 'mobx-devtools-mst'
import { Provider } from 'mobx-react'
import { persist } from 'mst-persist'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
import zooTheme from '@zooniverse/grommet-theme'
import '../../translations/i18n'
import i18n from 'i18next'
import {
  env,
  panoptes as panoptesClient,
  projects as projectsClient,
  tutorials as tutorialsClient
} from '@zooniverse/panoptes-js'

import { asyncSessionStorage } from '@helpers'
import { unregisterWorkers } from '../../workers'
import RootStore from '../../store'
import Layout from './components/Layout'
import ModalTutorial from './components/ModalTutorial'

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

  const [loaded, setLoaded] = useState(false)

  async function onMount() {
    try {
      const storageKey = `fem-classifier-${project.id}`
      await persist(storageKey, classifierStore, {
        storage: asyncSessionStorage,
        whitelist: ['fieldGuide', 'projects', 'subjectSets', 'tutorials', 'workflows']
      })
      console.log('store hydrated from local storage')
    } catch (error) {
      console.log('store snapshot error.')
      console.error(error)
    }
    const { classifications, subjects } = classifierStore
    classifierStore.setOnAddToCollection(onAddToCollection)
    classifications.setOnComplete(onCompleteClassification)
    classifierStore.setOnSubjectChange(onSubjectChange)
    subjects.setOnReset(onSubjectReset)
    classifierStore.setOnToggleFavourite(onToggleFavourite)
    setLoaded(true)
  }

  useEffect(() => {
    onMount()
  }, [])

  useEffect(function onLocaleChange() {
    if (locale) {
      classifierStore.setLocale(locale)
      i18n.changeLanguage(locale)
    }
  }, [locale])

  useEffect(function onProjectChange() {
    const { projects } = classifierStore
    if (loaded) {
      projects.setResources([project])
      projects.setActive(project.id)
    }
  }, [loaded, project.id])

  useEffect(function onURLChange() {
    const { workflows } = classifierStore
    if (loaded && workflowID) {
      workflows.selectWorkflow(workflowID, subjectSetID, subjectID)
    }
  }, [loaded, subjectID, subjectSetID, workflowID])

  useEffect(function onAuthChange() {
    if (loaded) {
      classifierStore.userProjectPreferences.checkForUser()
    }
  }, [loaded, authClient])

  try {
    if (!loaded) {
      return <Paragraph>Loading…</Paragraph>
    }

    return (
      <Provider classifierStore={classifierStore}>
          <>
            <Layout />
            <ModalTutorial />
          </>
      </Provider>
    )
  } catch (error) {
    const info = {
      package: '@zooniverse/classifier'
    }
    onError(error, info);
  }
  return null
}

Classifier.propTypes = {
  authClient: PropTypes.object.isRequired,
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
