import asyncStates from '@zooniverse/async-states'
import { GraphQLClient } from 'graphql-request'
import { Paragraph } from 'grommet'
import { Provider } from 'mobx-react'
import { applySnapshot, getSnapshot } from 'mobx-state-tree'
import PropTypes from 'prop-types'
import { useEffect } from 'react';
import i18n from '../../translations/i18n'
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
  locale = 'en',
  onAddToCollection = DEFAULT_HANDLER,
  onCompleteClassification = DEFAULT_HANDLER,
  onError = DEFAULT_HANDLER,
  onSubjectChange = DEFAULT_HANDLER,
  onSubjectReset = DEFAULT_HANDLER,
  onToggleFavourite = DEFAULT_HANDLER,
  project,
  showTutorial = false,
  subjectID,
  subjectSetID,
  workflowID
}) {
  const storeEnvironment = { authClient, client }
  const { user, upp, projectRoles, userHasLoaded } = usePanoptesUserSession({ authClient, projectID: project?.id })

  /*
    A user must have one of the following roles to view an inactive workflow. Or have admin mode enabled.
  */
  const canPreviewWorkflows = adminMode ||
    projectRoles?.indexOf('owner') > -1 ||
    projectRoles?.indexOf('collaborator') > -1 ||
    projectRoles?.indexOf('tester') > -1

  const allowedWorkflows = canPreviewWorkflows ? project?.links.workflows : project?.links.active_workflows
  const allowedWorkflowID = allowedWorkflows.includes(workflowID) ? workflowID : null

  /* Fetch the workflow object by id using SWR */
  const workflowSnapshot = useWorkflowSnapshot(allowedWorkflowID)

  /*
    Fetch workflow task strings using SWR. Locale is passed from component props.
  */
  const workflowTranslation = usePanoptesTranslations({
    translated_id: workflowID,
    translated_type: 'workflow',
    language: locale
  })
  const workflowStrings = workflowTranslation?.strings
  const workflowIsReady = !!workflowSnapshot && !!workflowStrings

  /* Init a mobx store if store is null, or load from session storage when cachePanoptesData is true
      - storeEnvironment is the auth env and clients
      - cachePanoptesData is true only for workflow.prioritized
      - fem-classifier-id is a key
      - When any of those three variables passed to useHydratedStore update, the useMemo in useHydratedStore runs
   */
  const classifierStore = useHydratedStore(storeEnvironment, cachePanoptesData, `fem-classifier-${project.id}`)
  const { classifications, subjects, userProjectPreferences } = classifierStore

  if (locale !== classifierStore.locale) {
    classifierStore.setLocale(locale)
    i18n.changeLanguage(locale)
  }

  /*
    When a project is fetched from Panoptes and it isn't already in the classifier store.
    (Do this before storing a workflow below)
  */
  const storedProject = classifierStore.projects.active
  if (project?.id && !storedProject) {
    applySnapshot(classifierStore.projects, {
      active: project.id,
      loadingState: asyncStates.success,
      resources: {
        [project.id]: project
      }
    })
  }

  /*
    When a workflow is fetched from Panoptes and it isn’t already in the classifier store.
  */
  const storedWorkflow = classifierStore.workflows.resources.get(workflowID)
  if (workflowIsReady && !storedWorkflow) {
    const storedWorkflows = getSnapshot(classifierStore.workflows)
    const newWorkflows = { ...storedWorkflows }
    newWorkflows.loadingState = asyncStates.success
    newWorkflows.resources = {
      ...storedWorkflows.resources,
      [workflowSnapshot.id]: {
        ...workflowSnapshot,
        strings: workflowStrings
      }
    }
    applySnapshot(classifierStore.workflows, newWorkflows)
  }

  /*
    Re-render workflow strings (translations) when workflow id or locale changes
  */
  useEffect(function onWorkflowStringsChange() {
    if (storedWorkflow && workflowStrings) {
      console.log('Refreshing workflow strings', storedWorkflow.id)
      applySnapshot(storedWorkflow.strings, workflowStrings)
    }
  }, [storedWorkflow, workflowStrings])

  /*
    The following useEffects that handle classifier callbacks
    should run after the store is created and hydrated.
    Otherwise, hydration will overwrite the callbacks with
    their defaults.
  */
  useEffect(function () {
    console.log('setting onCompleteClassification')
    classifications.setOnComplete(onCompleteClassification)

    return () => {
      console.log('cleaning up onCompleteClassification')
      classifications.setOnComplete(DEFAULT_HANDLER)
    }
  }, [classifications.setOnComplete, onCompleteClassification])

  useEffect(function () {
    console.log('setting onSubjectReset')
    subjects.setOnReset(onSubjectReset)

    return () => {
      console.log('cleaning up onSubjectReset')
      subjects.setOnReset(DEFAULT_HANDLER)
    }
  }, [onSubjectReset, subjects.setOnReset])

  useEffect(function () {
    console.log('setting onAddToCollection')
    classifierStore.setOnAddToCollection(onAddToCollection)

    return () => {
      console.log('cleaning up onAddToCollection')
      classifierStore.setOnAddToCollection(DEFAULT_HANDLER)
    }
  }, [classifierStore.setOnAddToCollection, onAddToCollection])

  useEffect(function () {
    console.log('setting onSubjectChange')
    classifierStore.setOnSubjectChange(onSubjectChange)

    return () => {
      console.log('cleaning up onSubjectChange')
      classifierStore.setOnSubjectChange(DEFAULT_HANDLER)
    }
  }, [classifierStore.setOnSubjectChange, onSubjectChange])

  useEffect(function () {
    console.log('setting onToggleFavourite')
    classifierStore.setOnToggleFavourite(onToggleFavourite)

    return () => {
      console.log('cleaning up onToggleFavourite')
      classifierStore.setOnToggleFavourite(DEFAULT_HANDLER)
    }
  }, [classifierStore.setOnToggleFavourite, onToggleFavourite])

  /* upp and user fetched from usePanoptesUserSession with SWR:
    - Reset userProjectPreferences store when fresh upp are loading from Panoptes
    - If no user, upp is null so clear the userProjectPreferences store
    - If user, set upp in userProjectPreferences store
   */
  useEffect(function onUPPChange() {
    if (upp === undefined) {
      console.log('resetting stale user data')
      userProjectPreferences.reset()
    }
    if (upp === null) {
      userProjectPreferences.clear()
    }
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
  const projectIsReady = !!classifierStore.projects.active
  const classifierIsReady = userHasLoaded && workflowIsReady && projectIsReady

  try {
    return (
      <Provider classifierStore={classifierStore}>
      {!allowedWorkflowID ?
        <Paragraph>This workflow does not exist or you do not have permission to view it.</Paragraph>
        : classifierIsReady ?
           <Classifier
              onError={onError}
              showTutorial={showTutorial}
              subjectSetID={subjectSetID}
              subjectID={subjectID}
              workflowSnapshot={workflowSnapshot}
            /> :
          <Paragraph>Loading the Classifier</Paragraph>
        }
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

ClassifierContainer.propTypes = {
  /** Returned from useAdminMode() in parent app */
  adminMode: PropTypes.bool,
  authClient: PropTypes.object.isRequired,
  /** Cache Panoptes API data in session storage such as when workflow.prioritized */
  cachePanoptesData: PropTypes.bool,
  /** Locale is controlled in parent app */
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
