import { Box, Grid, ResponsiveContext } from 'grommet'
import dynamic from 'next/dynamic'
import { arrayOf, bool, func, object, shape, string } from 'prop-types'
import { useCallback, useContext, useState } from 'react'
import styled from 'styled-components'

import CollectionsModal from '@shared/components/CollectionsModal'
import ConnectWithProject from '@shared/components/ConnectWithProject'
import ProjectStatistics from '@shared/components/ProjectStatistics'
import ExternalWorkflow from './components/ExternalWorkflow'
import RecentSubjects from './components/RecentSubjects'
import YourProjectStatsContainer from './components/YourProjectStats/YourProjectStatsContainer'
import StandardLayout from '@shared/components/StandardLayout'
import WorkflowAssignmentModal from './components/WorkflowAssignmentModal'
import WorkflowMenuModal from './components/WorkflowMenuModal'
import asyncStates from '@zooniverse/async-states'

export const ClassifierWrapper = dynamic(() =>
  import('./components/ClassifierWrapper'), { ssr: false }
)

const StatsAndRecentsGrid = styled(Grid)`
  width: 100%;
  grid-template-columns: minmax(280px, auto) minmax(auto, 60rem);

  @media (width < 1000px) {
    grid-template-columns: auto;
  }
`

function ClassifyPage({
  appLoadingState,
  externalWorkflowEnabled = false,
  onSubjectReset,
  subjectID,
  subjectSetID,
  workflowFromUrl,
  workflowID,
  workflows = [],
}) {
  const size = useContext(ResponsiveContext)

  const {
    external_workflow_description: externalWorkflowDescription,
    external_workflow_url: externalWorkflowUrl
  } = workflowFromUrl?.configuration ?? {}
  const isExternalWorkflow = externalWorkflowEnabled && !!externalWorkflowUrl?.trim()

  /*
    Enable session caching in the classifier for projects with ordered subject selection.
  */
  const cachePanoptesData = workflows.some(workflow => workflow.prioritized)

  /*
    What the main area shows, and the URL it came from, so the view survives the
    header's Classify link dropping the workflow from the URL.
  */
  const [mainView, setMainView] = useState({})
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
    Derive the main view from the URL, when the URL changes.
    Keep the previous view if there's no workflow ID in the URL.
  */
  const workflowChanged = mainView.workflowID !== workflowID
  const subjectSetChanged = mainView.subjectSetID !== subjectSetID
  const subjectChanged = mainView.subjectID !== subjectID
  const URLChanged = workflowChanged || subjectSetChanged || subjectChanged

  if (URLChanged && isExternalWorkflow) {
    setMainView({
      description: externalWorkflowDescription,
      isExternal: true,
      subjectID,
      subjectSetID,
      url: externalWorkflowUrl,
      workflowID
    })
  }

  if (URLChanged && canClassify && !isExternalWorkflow) {
    setMainView({
      subjectID,
      subjectSetID,
      workflowID
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
          <Box as='main' height={{ min: '400px'}} width='100%'>
            {!canClassify && appLoadingState === asyncStates.success && (
              <WorkflowMenuModal
                subjectSetFromUrl={subjectSetFromUrl}
                workflowFromUrl={workflowFromUrl}
                workflows={workflows}
              />
            )}
            {mainView.isExternal ? (
              <ExternalWorkflow
                description={mainView.description}
                url={mainView.url}
              />
            ) : (
              <ClassifierWrapper
                cachePanoptesData={cachePanoptesData}
                onAddToCollection={onAddToCollection}
                onSubjectReset={onSubjectReset}
                showTutorial={showTutorial}
                subjectID={mainView.subjectID}
                subjectSetID={mainView.subjectSetID}
                workflowID={mainView.workflowID}
              />
            )}
            {workflowFromUrl && (
              <WorkflowAssignmentModal currentWorkflowID={workflowID} />
            )}
          </Box>

          <Box as='aside' gap='medium' width='min(100%, 90rem)'>
            <StatsAndRecentsGrid gap={size === 'small' ? 'small' : 'medium'}>
              <YourProjectStatsContainer />
              <RecentSubjects />
            </StatsAndRecentsGrid>
            <ProjectStatistics />
            <ConnectWithProject />
          </Box>
        </Box>
      </StandardLayout>
    </>
  )
}

ClassifyPage.propTypes = {
  /** True if the project has the external workflow experimental tool. With workflow.configuration.external_workflow_url set, the departure screen replaces the classifier. */
  externalWorkflowEnabled: bool,
  /** Sets subjectID state in ClassifyPageContainer to undefined */
  onSubjectReset: func,
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

export default ClassifyPage
export { ClassifyPage }
