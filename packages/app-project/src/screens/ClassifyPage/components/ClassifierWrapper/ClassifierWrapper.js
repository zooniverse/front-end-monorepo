import Classifier from '@zooniverse/classifier'
import { useRouter } from 'next/router'
import auth from 'panoptes-client/lib/auth'
import { bool, func, string, shape } from 'prop-types'
import { useCallback } from 'react'
import asyncStates from '@zooniverse/async-states'
import { Box } from 'grommet'
import { Loader } from '@zooniverse/react-components'

import { useAdminMode } from '@hooks'
import addQueryParams from '@helpers/addQueryParams'
import logToSentry from '@helpers/logger/logToSentry.js'
import ErrorMessage from './components/ErrorMessage'
import useYourProjectStats from '../YourProjectStats/useYourProjectStats.js'
import incrementStats from '../YourProjectStats/helpers/incrementStats.js'

function onError(error, errorInfo = {}) {
  logToSentry(error, errorInfo)
  console.error('Classifier error', error)
}

const DEFAULT_HANDLER = () => true

/**
  A wrapper for the Classifier component. Responsible for handling:
  - classifier errors.
  - updates to project recents on classification complete.
  - updates to stored favourites, when the classification subject is favourited.
  - Passing locale to classifier
  - Modifies the url when using prioritized subjects in the classifier (Next or Prev btns)
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
  workflowID
}) {
  const { adminMode } = useAdminMode()
  const nextRouter = useRouter()
  router = router || nextRouter
  const locale = router?.locale
  const ownerSlug = router?.query.owner
  const projectSlug = router?.query.project

  /*
    Increment user stats on every classification submitted.
    Add the recently classified subject to the user's Recents.
  */
  const projectID = project?.id
  const { mutate } = useYourProjectStats({ projectID, userID })

  const addRecents = recents?.add
  const onCompleteClassification = useCallback((classification, subject) => {
    incrementStats(mutate, projectID, userID)
    addRecents({
      favorite: subject.favorite,
      subjectId: subject.id,
      locations: subject.locations
    })
  }, [addRecents, projectID, userID])

  /*
    If the page URL contains a subject ID, update that ID when the classification subject changes.
    Subject page URLs can be either `/classify/workflow/{workflowID}/subject/{subjectID}`
    or `/classify/workflow/{workflowID}/subject-set/{subjectSetID}/subject/{subjectID}`.
    Example: Subject Set Progress Banner arrow buttons
  */
  let baseURL = `/${ownerSlug}/${projectSlug}/classify/workflow/${workflowID}`
  if (subjectSetID) {
    baseURL = `${baseURL}/subject-set/${subjectSetID}`
  }
  const subjectInURL = router?.query.subjectID !== undefined
  const replaceRoute = router?.replace

  /*
    When the prioritied subject selection feature was implemented, we used shallow routing
    to change the [subjecID] subpath in the url in reaction to the subject changing in the
    Classifier component. Shallow routing isn't supported in Next.js 13, so the url-changing
    feature is turned off for now. See https://github.com/zooniverse/front-end-monorepo/issues/4977
  */
  const onSubjectChange = useCallback(
    subject => {
      if (subjectInURL) {
        const subjectPageURL = `${baseURL}/subject/${subject.id}`
        const href = addQueryParams(subjectPageURL)
        // replaceRoute(href, href, { shallow: true })
    }
  }, [baseURL, subjectInURL])

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
    return <ErrorMessage error={error} />
  }

  return (
    <Box height='100%' width='100%' align='center'>
      <Loader />
    </Box>
  )
}

ClassifierWrapper.propTypes = {
  /** Cache Panoptes API data in session storage */
  cachePanoptesData: bool,
  /** Callback that will be called with a subject ID when the classification subject is added to a collection. */
  onAddToCollection: func,
  /** Panoptes Auth client */
  authClient: shape({}),
  /** Callback that runs when the classifier subject queue is reset, so that we can pick a new subject.
   * Sets subjectID state in ClassifyPageContainer to undefined */
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
  /** Stored as a state variable in ClassifierPageContainer */
  subjectID: string,
  /** optional subject set ID (from the classifierProps via getDefaultPageProps in page index.js) */
  subjectSetID: string,
  /** Current logged-in user */
  user: shape({
    error: string
  }),
  /** Logged-in user ID */
  userID: string,
  /** required workflow ID (from the classifierProps via getDefaultPageProps in page index.js) */
  workflowID: string
}
