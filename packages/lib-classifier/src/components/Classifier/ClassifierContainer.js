import { GraphQLClient } from 'graphql-request'
import { Paragraph } from 'grommet'
import { Provider } from 'mobx-react'
import { applySnapshot } from 'mobx-state-tree'
import PropTypes from 'prop-types'
import { StrictMode, useEffect } from 'react';
import '../../translations/i18n'
import {
  env,
  panoptes as panoptesClient,
  projects as projectsClient,
  tutorials as tutorialsClient
} from '@zooniverse/panoptes-js'

import {
  useHydratedStore,
  usePanoptesTranslations,
  useWorkflowSnapshot
} from '@hooks'

import usePanoptesUserSession from './hooks/usePanoptesUserSession'
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

const DEFAULT_HANDLER = () => true
export default function ClassifierContainer({
  adminMode = false,
  authClient,
  cachePanoptesData = false,
  locale,
  onAddToCollection = DEFAULT_HANDLER,
  onCompleteClassification = DEFAULT_HANDLER,
  onError = DEFAULT_HANDLER,
  onSubjectChange = DEFAULT_HANDLER,
  onSubjectReset = DEFAULT_HANDLER,
  onToggleFavourite = DEFAULT_HANDLER,
  project,
  showTutorial=false,
  subjectID,
  subjectSetID,
  workflowID
}) {
  const storeEnvironment = { authClient, client }
  const { user, upp, projectRoles, userHasLoaded } = usePanoptesUserSession({ authClient, projectID: project?.id })
  const canPreviewWorkflows = adminMode ||
    projectRoles?.indexOf('owner') > -1 ||
    projectRoles?.indexOf('collaborator') > -1 ||
    projectRoles?.indexOf('tester') > -1

  const allowedWorkflows = canPreviewWorkflows ? project?.links.workflows : project?.links.active_workflows
  const allowedWorkflowID = allowedWorkflows.includes(workflowID) ? workflowID : null

  const workflowSnapshot = useWorkflowSnapshot(allowedWorkflowID)
  const workflowTranslation = usePanoptesTranslations({
    translated_id: workflowID,
    translated_type: 'workflow',
    language: locale
  })
  const workflowStrings = workflowTranslation?.strings

  const classifierStore = useHydratedStore(storeEnvironment, cachePanoptesData, `fem-classifier-${project.id}`)
  const { classifications, subjects, userProjectPreferences } = classifierStore
  const storedWorkflow = classifierStore.workflows.resources.get(workflowID)
  if (workflowSnapshot?.id && workflowStrings) {
    workflowSnapshot.strings = workflowStrings
    if (!storedWorkflow) {
      classifierStore.workflows.setResources([workflowSnapshot])
    }
  }

  if (project?.id) {
    const storedProject = classifierStore.projects.active
    const projectChanged = project.id !== storedProject?.id

    if (projectChanged) {
      const { projects } = classifierStore
      projects.setResources([project])
      projects.setActive(project.id)
    }
  }

  useEffect(function onWorkflowStringsChange() {
    if (storedWorkflow && workflowStrings) {
      console.log('Refreshing workflow strings', storedWorkflow.id)
      applySnapshot(storedWorkflow.strings, workflowStrings)
    }
  }, [storedWorkflow, workflowStrings])

  useEffect(function () {
    /*
    This should run after the store is created and hydrated.
    Otherwise, hydration will overwrite the callbacks with
    their defaults.
    */
    console.log('setting onCompleteClassification')
    classifications.setOnComplete(onCompleteClassification)

    return () => {
      console.log('cleaning up onCompleteClassification')
      classifications.setOnComplete(DEFAULT_HANDLER)
    }
  }, [classifications.setOnComplete, onCompleteClassification])

  useEffect(function () {
    /*
    This should run after the store is created and hydrated.
    Otherwise, hydration will overwrite the callbacks with
    their defaults.
    */
    console.log('setting onSubjectReset')
    subjects.setOnReset(onSubjectReset)

    return () => {
      console.log('cleaning up onSubjectReset')
      subjects.setOnReset(DEFAULT_HANDLER)
    }
  }, [onSubjectReset, subjects.setOnReset])

  useEffect(function () {
    /*
    This should run after the store is created and hydrated.
    Otherwise, hydration will overwrite the callbacks with
    their defaults.
    */
    console.log('setting onAddToCollection')
    classifierStore.setOnAddToCollection(onAddToCollection)

    return () => {
      console.log('cleaning up onAddToCollection')
      classifierStore.setOnAddToCollection(DEFAULT_HANDLER)
    }
  }, [classifierStore.setOnAddToCollection, onAddToCollection])

  useEffect(function () {
    /*
    This should run after the store is created and hydrated.
    Otherwise, hydration will overwrite the callbacks with
    their defaults.
    */
    console.log('setting onSubjectChange')
    classifierStore.setOnSubjectChange(onSubjectChange)

    return () => {
      console.log('cleaning up onSubjectChange')
      classifierStore.setOnSubjectChange(DEFAULT_HANDLER)
    }
  }, [classifierStore.setOnSubjectChange, onSubjectChange])

  useEffect(function () {
    /*
    This should run after the store is created and hydrated.
    Otherwise, hydration will overwrite the callbacks with
    their defaults.
    */
    console.log('setting onToggleFavourite')
    classifierStore.setOnToggleFavourite(onToggleFavourite)

    return () => {
      console.log('cleaning up onToggleFavourite')
      classifierStore.setOnToggleFavourite(DEFAULT_HANDLER)
    }
  }, [classifierStore.setOnToggleFavourite, onToggleFavourite])

  useEffect(function onUPPChange() {
    // fresh preferences are loading from Panoptes.
    if (upp === undefined) {
      console.log('resetting stale user data')
      userProjectPreferences.reset()
    }
    // no one is logged in.
    if (upp === null) {
      userProjectPreferences.clear()
    }
    // someone is logged in.
    if (upp?.id) {
      userProjectPreferences.setUPP(upp)
    }
  }, [upp, userProjectPreferences])

  /*
  The classifier is ready once:
  - we've checked Panoptes for a user session.
  - the workflow has loaded.
  - the project has been added to the store.
  */
  const workflowIsReady = !!workflowSnapshot?.strings
  const projectIsReady = !!classifierStore.projects.active
  const classifierIsReady = userHasLoaded && workflowIsReady && projectIsReady
  try {
    if (classifierIsReady) {

      return (
        <StrictMode>
          <Provider classifierStore={classifierStore}>
            <Classifier
              locale={locale}
              onError={onError}
              showTutorial={showTutorial}
              subjectSetID={subjectSetID}
              subjectID={subjectID}
              workflowSnapshot={workflowSnapshot}
            />
          </Provider>
        </StrictMode>
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
  adminMode: PropTypes.bool,
  authClient: PropTypes.object.isRequired,
  cachePanoptesData: PropTypes.bool,
  locale: PropTypes.string,
  onAddToCollection: PropTypes.func,
  onCompleteClassification: PropTypes.func,
  onError: PropTypes.func,
  onSubjectChange: PropTypes.func,
  onSubjectReset: PropTypes.func,
  onToggleFavourite: PropTypes.func,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  showTutorial: PropTypes.bool,
  subjectID: PropTypes.string,
  subjectSetID: PropTypes.string,
  workflowID: PropTypes.string
}
