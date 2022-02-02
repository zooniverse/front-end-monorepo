import { GraphQLClient } from 'graphql-request'
import { Paragraph } from 'grommet'
import makeInspectable from 'mobx-devtools-mst'
import { Provider } from 'mobx-react'
import { persist } from 'mst-persist'
import useSWR from 'swr'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useState } from 'react'
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

  const [loaded, setLoaded] = useState(false)
  const { data } = useSWR(`/workflows/${workflowID}`, client.panoptes.get)
  let workflowData
  if (data?.text) {
    workflowData = data.text
  }

  async function onMount() {
    if (cachePanoptesData) {
      try {
        const storageKey = `fem-classifier-${project.id}`
        await persist(storageKey, classifierStore, {
          storage: asyncSessionStorage,
          whitelist: ['fieldGuide', 'projects', 'subjects', 'subjectSets', 'tutorials', 'workflows', 'workflowSteps']
        })
        console.log('store hydrated from local storage')
        const { subjects, workflows } = classifierStore
        if (!workflows.active?.prioritized) {
          /*
          In this case, we delete the saved queue so that
          refreshing the classifier will load a new, randomised
          subject queue.
          */
          subjects.reset()
        }
        if (subjects.active) {
          /*
            This is a hack to start a new classification from a snapshot.
          */
          subjects.setActiveSubject(subjects.active.id)
        }
      } catch (error) {
        console.log('store snapshot error.')
        console.error(error)
      }
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

  useEffect(function onAuthChange() {
    if (loaded) {
      classifierStore.userProjectPreferences.checkForUser()
    }
  }, [loaded, authClient])

  try {
    if (loaded && workflowData) {
      const [ workflowSnapshot ] = JSON.parse(workflowData).workflows

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
