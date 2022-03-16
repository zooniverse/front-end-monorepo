import { Box, Grid } from 'grommet'
import dynamic from 'next/dynamic'
import { arrayOf, func, shape, string } from 'prop-types'
import { useState } from 'react'
import { withResponsiveContext } from '@zooniverse/react-components'

import ThemeModeToggle from '@components/ThemeModeToggle'
import ProjectName from '@components/ProjectName'
import ConnectWithProject from '@shared/components/ConnectWithProject'
import ProjectStatistics from '@shared/components/ProjectStatistics'
import FinishedForTheDay from './components/FinishedForTheDay'
import RecentSubjects from './components/RecentSubjects'
import YourStats from './components/YourStats'
import StandardLayout from '@shared/components/StandardLayout'
import WorkflowAssignmentModal from './components/WorkflowAssignmentModal'
import WorkflowMenuModal from './components/WorkflowMenuModal'
import asyncStates from '@zooniverse/async-states'

export const ClassifierWrapper = dynamic(() =>
  import('./components/ClassifierWrapper'), { ssr: false }
)

function ClassifyPage({
  addToCollection,
  appLoadingState,
  onSubjectReset,
  screenSize,
  subjectID,
  subjectSetID,
  workflowID,
  workflowFromUrl,
  workflows = []
}) {
  /*
    Enable session caching in the classifier for projects with ordered subject selection.
  */
  const cachePanoptesData = workflows.some(workflow => workflow.prioritized)
  const responsiveColumns = (screenSize === 'small')
    ? ['auto']
    : ['1em', 'auto', '1em']
  const [classifierProps, setClassifierProps]  = useState({})
  const [showTutorial, setShowTutorial] = useState(false)

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

  return (
    <StandardLayout>

      <Box
        align='center'
        gap='medium'
        pad={{ horizontal: 'small', vertical: 'medium' }}
      >

        <Box as='main' fill='horizontal'>
          {!canClassify && appLoadingState === asyncStates.success && (
            <WorkflowMenuModal
              subjectSetFromUrl={subjectSetFromUrl}
              workflowFromUrl={workflowFromUrl}
              workflows={workflows}
            />
          )}
          <Grid columns={responsiveColumns} gap='small'>
            <ProjectName />
            <ClassifierWrapper
              cachePanoptesData={cachePanoptesData}
              onAddToCollection={addToCollection}
              onSubjectReset={onSubjectReset}
              showTutorial={showTutorial}
              {...classifierProps}
            />
            <ThemeModeToggle />
          </Grid>
          {workflowFromUrl &&
            <WorkflowAssignmentModal currentWorkflowID={workflowID} />}
        </Box>

        <Box as='aside' gap='medium' width={{ min: 'none', max: 'xxlarge' }}>
          <FinishedForTheDay />
          <Grid
            alignContent='stretch'
            columns={(screenSize === 'small') ? ['auto'] : ['1fr', '2fr']}
            gap='medium'
          >
            <YourStats />
            <RecentSubjects
              size={(screenSize === 'small') ? 1 : 3}
            />
          </Grid>
          <ProjectStatistics />
          <ConnectWithProject />
        </Box>

      </Box>
    </StandardLayout>
  )
}

ClassifyPage.propTypes = {
  addToCollection: func,
  screenSize: string,
  subjectID: string,
  subjectSetID: string,
  workflowID: string,
  workflows: arrayOf(shape({
    id: string.isRequired
  }))
}

export default withResponsiveContext(ClassifyPage)
export { ClassifyPage }
