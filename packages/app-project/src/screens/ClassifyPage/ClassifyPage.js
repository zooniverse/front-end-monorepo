import { Box, Grid } from 'grommet'
import dynamic from 'next/dynamic'
import { arrayOf, func, object, shape, string } from 'prop-types'
import { useCallback, useState } from 'react'
import withResponsiveContext from '@zooniverse/react-components/helpers/withResponsiveContext'

import CollectionsModal from '@shared/components/CollectionsModal'
import ConnectWithProject from '@shared/components/ConnectWithProject'
import ProjectStatistics from '@shared/components/ProjectStatistics'
import FinishedForTheDay from './components/FinishedForTheDay'
import RecentSubjects from './components/RecentSubjects'
import YourProjectStatsContainer from './components/YourProjectStats/YourProjectStatsContainer.js'
import StandardLayout from '@shared/components/StandardLayout'
import WorkflowAssignmentModal from './components/WorkflowAssignmentModal'
import WorkflowMenuModal from './components/WorkflowMenuModal'
import asyncStates from '@zooniverse/async-states'

export const ClassifierWrapper = dynamic(() =>
  import('./components/ClassifierWrapper'), { ssr: false }
)

function ClassifyPage({
  appLoadingState,
  onSubjectReset,
  screenSize,
  subjectID,
  subjectSetID,
  workflowFromUrl,
  workflowID,
  workflows = [],
}) {
  /*
    Enable session caching in the classifier for projects with ordered subject selection.
  */
  const cachePanoptesData = workflows.some(workflow => workflow.prioritized)

  const [classifierProps, setClassifierProps] = useState({})
  const [showTutorial, setShowTutorial] = useState(false)
  const [collectionsModalActive, setCollectionsModalActive] = useState(false)
  const [collectionsSubjectID, setCollectionsSubjectID] = useState(subjectID)

  let subjectSetFromUrl
  if (workflowFromUrl && workflowFromUrl.subjectSets) {
    subjectSetFromUrl = workflowFromUrl.subjectSets.find(subjectSet => subjectSet.id === subjectSetID)
  }

  // The classifier requires a workflow ID by default
  let canClassify = !!workflowID
  // grouped workflows require a subject set ID
  canClassify = workflowFromUrl?.grouped ? !!subjectSetID : canClassify
  // indexed subject sets require a subject ID
  const isIndexed = subjectSetFromUrl?.metadata.indexFields
  canClassify = isIndexed ? !!subjectID : canClassify

  /*
    Derive classifier state from the URL, when the URL changes.
    Use the previous classifier state if there's no workflow ID in the URL.
  */
  const workflowChanged = classifierProps.workflowID !== workflowID
  const subjectSetChanged = classifierProps.subjectSetID !== subjectSetID
  const subjectChanged = classifierProps.subjectID !== subjectID
  const URLChanged = workflowChanged || subjectSetChanged || subjectChanged

  if (canClassify && URLChanged) {
    setClassifierProps({
      workflowID,
      subjectSetID,
      subjectID
    })
    setShowTutorial(true)
  }

  /** This subjectID is passed from the Classifier component's internal state */
  const onAddToCollection = useCallback((subjectID) => {
    setCollectionsSubjectID(subjectID)
    setCollectionsModalActive(true)
  }, [setCollectionsModalActive, setCollectionsSubjectID])

  return (
    <>
      <CollectionsModal
        collectionsModalActive={collectionsModalActive}
        subjectID={collectionsSubjectID}
        setCollectionsModalActive={setCollectionsModalActive}
      />
      <StandardLayout>
        <Box
          align='center'
          gap='medium'
          pad='medium'
        >
          <Box as='main' fill='horizontal'>
            {!canClassify && appLoadingState === asyncStates.success && (
              <WorkflowMenuModal
                subjectSetFromUrl={subjectSetFromUrl}
                workflowFromUrl={workflowFromUrl}
                workflows={workflows}
              />
            )}
            <ClassifierWrapper
              cachePanoptesData={cachePanoptesData}
              onAddToCollection={onAddToCollection}
              onSubjectReset={onSubjectReset}
              showTutorial={showTutorial}
              {...classifierProps}
            />
            {workflowFromUrl && (
              <WorkflowAssignmentModal currentWorkflowID={workflowID} />
            )}
          </Box>

          <Box as='aside' gap='medium' width='min(100%, 90rem)'>
            <FinishedForTheDay />
            <Grid
              columns={screenSize === 'small' ? ['auto'] : ['1fr', '2fr']}
              gap={screenSize === 'small' ? 'small' : 'medium'}
            >
              <YourProjectStatsContainer />
              <RecentSubjects size={screenSize === 'small' ? 1 : 3} />
            </Grid>
            <ProjectStatistics />
            <ConnectWithProject />
          </Box>
        </Box>
      </StandardLayout>
    </>
  )
}

ClassifyPage.propTypes = {
  /** Sets subjectID state in ClassifyPageContainer to undefined */
  onSubjectReset: func,
  /** withResponsiveContext */
  screenSize: string,
  /** This subjectID is a state variable in ClassifyPageContainer */
  subjectID: string,
  /** This subjectSetID is from getDefaultPageProps in page index.js */
  subjectSetID: string,
  /** In ClassifyPageContainer, we double check that a volunteer navigating to
   * a url with workflowID is allowed to load that workflow.
   * The workflowFromUrl object is the current workflow. */
  workflowFromUrl: object,
  /** The id of workflowFromUrl */
  workflowID: string,
  /** workflows array is from getDefaultPageProps in page index.js */
  workflows: arrayOf(shape({
    id: string.isRequired
  }))
}

export default withResponsiveContext(ClassifyPage)
export { ClassifyPage }
