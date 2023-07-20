import Classifier from '@zooniverse/classifier'
import { useRouter } from 'next/router'
import auth from 'panoptes-client/lib/auth'
import { bool, func, string, shape } from 'prop-types'
import { useCallback } from 'react'
import asyncStates from '@zooniverse/async-states'

import { useAdminMode } from '@hooks'
import addQueryParams from '@helpers/addQueryParams'
import logToSentry from '@helpers/logger/logToSentry.js'
import ErrorMessage from './components/ErrorMessage'
import Loader from '@shared/components/Loader'

function onError(error, errorInfo={}) {
  logToSentry(error, errorInfo)
  console.error('Classifier error', error)
}

const DEFAULT_HANDLER = () => true

/**
  A wrapper for the Classifier component. Responsible for handling:
  - classifier errors.
  - updates to project recents on classification complete.
  - updates to stored favourites, when the classification subject is favourited.
  - updates to stored collections, when the classification subject is added to a collection.
  - Passing locale to classifier
*/
export default function ClassifierWrapper({
  authClient = auth,
  appLoadingState = asyncStates.initialized,
  cachePanoptesData = false,
  collections = null,
  mode,
  onAddToCollection = DEFAULT_HANDLER,
  onSubjectReset = DEFAULT_HANDLER,
  project = null,
  recents = null,
  router = null,
  showTutorial = false,
  subjectID,
  subjectSetID,
  user = null,
  userID,
  workflowID,
  yourStats
}) {
  const { adminMode } = useAdminMode()
  const nextRouter = useRouter()
  router = router || nextRouter
  const locale = router?.locale
  const ownerSlug = router?.query.owner
  const projectSlug = router?.query.project

  const incrementStats = yourStats?.increment
  const addRecents = recents?.add
  const onCompleteClassification = useCallback((classification, subject) => {
    const finishedSubject = subject.already_seen || subject.retired
    if (!finishedSubject) {
      incrementStats()
    }
    addRecents({
      favorite: subject.favorite,
      subjectId: subject.id,
      locations: subject.locations
    })
  }, [addRecents, incrementStats])

  const replaceRoute = router.replace
  const baseURL = `/${ownerSlug}/${projectSlug}/classify/workflow/${workflowID}`
  const onSubjectChange = useCallback((subject) => {
    if (subjectSetID && subjectID && subject.id !== subjectID) {
      const newSubjectRoute = `${baseURL}/subject-set/${subjectSetID}/subject/${subject.id}`
      const href = addQueryParams(newSubjectRoute)
      const as = href
      replaceRoute(href, as, { shallow: true })
    }
  }, [baseURL, replaceRoute, subjectID, subjectSetID])

  const addFavourites = collections?.addFavourites
  const removeFavourites = collections?.removeFavourites
  const onToggleFavourite = useCallback((subjectId, isFavourite) => {
    return isFavourite ? addFavourites([subjectId]) : removeFavourites([subjectId])
  }, [addFavourites, removeFavourites])

  const somethingWentWrong = appLoadingState === asyncStates.error

  if (somethingWentWrong) {
    const { error: projectError } = project
    const { error: userError } = user
    
    const errorToMessage = projectError || userError || new Error('Something went wrong')
    return (
      <ErrorMessage error={errorToMessage} />
    )
  }

  try {
    if (appLoadingState === asyncStates.success) {
      const key = userID || 'no-user'
      return (
        <Classifier
          adminMode={adminMode}
          authClient={authClient}
          cachePanoptesData={cachePanoptesData}
          key={key}
          locale={locale}
          mode={mode}
          onAddToCollection={onAddToCollection}
          onCompleteClassification={onCompleteClassification}
          onError={onError}
          onSubjectChange={onSubjectChange}
          onSubjectReset={onSubjectReset}
          onToggleFavourite={onToggleFavourite}
          project={project}
          showTutorial={showTutorial}
          subjectID={subjectID}
          subjectSetID={subjectSetID}
          workflowID={workflowID}
        />
      )
    }
  } catch (error) {
    onError(error)
    return (
      <ErrorMessage error={error} />
    )
  }

  return (
    <Loader
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      border={{
        color: {
          dark: 'dark-3',
          light: 'light-3'
        },
        side: 'all',
        size: 'thin'
      }}
      height='100%'
      width='100%'
    />
  )
}

ClassifierWrapper.propTypes = {
  /** Cache Panoptes API data in session storage */
  cachePanoptesData: bool,
  /** Callback that will be called with a subject ID when the classification subject is added to a collection. */
  onAddToCollection: func,
  /** Panoptes Auth client */
  authClient: shape({}),
  /** Callback that runs when the classifier subject queue is reset, so that we can pick a new subject. */
  onSubjectReset: func,
  /** JSON snapshot of the active Panoptes project */
  project: shape({}),
  /** 
    Optional custom router. Overrides the default NextJS.
    Useful for mocking the router in stories and shallow tests.
  */
  router: shape({
    locale: string
  }),
  /** Allow the classifier to open a popup tutorial, if necessary. */
  showTutorial: bool,
  /** optional subjectID (from the page URL.) */
  subjectID: string,
  /** optional subject set ID (from the page URL.) */
  subjectSetID: string,
  /** Current logged-in user */
  user: shape({
    error: string
  }),
  /** Logged-in user ID */
  userID: string,
  /** required workflow ID (from the page URL.) */
  workflowID: string
}
