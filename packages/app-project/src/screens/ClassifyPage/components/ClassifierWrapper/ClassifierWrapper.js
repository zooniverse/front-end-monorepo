import Classifier from '@zooniverse/classifier'
import { useRouter } from 'next/router'
import auth from 'panoptes-client/lib/auth'
import { bool, func, string, shape } from 'prop-types'
import asyncStates from '@zooniverse/async-states'

import addQueryParams from '@helpers/addQueryParams'
import { logToSentry } from '@helpers/logger'
import ErrorMessage from './components/ErrorMessage'
import Loader from '@shared/components/Loader'

/**
  A wrapper for the Classifier component. Responsible for handling:
  - classifier errors.
  - updates to project recents on classification complete.
  - updates to stored favourites,when the classification subject is favourited.
  - updates to stored collections, when the classification subject is added to a collection.
*/
export default function ClassifierWrapper({
  authClient = auth,
  appLoadingState = asyncStates.initialized,
  cachePanoptesData = false,
  collections,
  mode,
  onAddToCollection = () => true,
  onSubjectReset = () => true,
  project,
  recents,
  showTutorial = false,
  subjectID,
  subjectSetID,
  user,
  userID,
  workflowID,
  yourStats
}) {
  const router = useRouter()
  const { locale } = router
  function onCompleteClassification(classification, subject) {
    const finishedSubject = subject.already_seen || subject.retired
    if (!finishedSubject) {
      yourStats.increment()
    }
    recents.add({
      favorite: subject.favorite,
      subjectId: subject.id,
      locations: subject.locations
    })
  }

  function onError(error, errorInfo={}) {
    logToSentry(error, errorInfo)
    console.error('Classifier error', error)
  }

  function onSubjectChange(subject) {
    const { query } = router
    const baseURL = `/${query.owner}/${query.project}/classify`
    if (query.subjectID && subject.id !== query.subjectID) {
      const newSubjectRoute = `${baseURL}/workflow/${workflowID}/subject-set/${subjectSetID}/subject/${subject.id}`
      const href = addQueryParams(newSubjectRoute)
      const as = href
      router.replace(href, as, { shallow: true })
    }
  }

  function onToggleFavourite(subjectId, isFavourite) {
    if (isFavourite) {
      collections.addFavourites([subjectId])
    } else {
      collections.removeFavourites([subjectId])
    }
  }

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
