import { Box, Grid } from 'grommet'
import dynamic from 'next/dynamic'
import { arrayOf, func, shape, string } from 'prop-types'
import React from 'react'
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
import WorkflowMenu from './components/WorkflowMenu'

const ClassifierWrapper = dynamic(() =>
  import('./components/ClassifierWrapper'), { ssr: false }
)

function ClassifyPage ({
  addToCollection,
  screenSize,
  subjectID,
  subjectSetID,
  workflowID,
  workflows = []
}) {
  const responsiveColumns = (screenSize === 'small')
    ? ['auto']
    : ['1em', 'auto', '1em']

  const [ workflowFromUrl ] = workflows.filter(workflow => workflow.id === workflowID)
  let subjectSetFromUrl
  if (workflowFromUrl && workflowFromUrl.subjectSets) {
    [ subjectSetFromUrl ] = workflowFromUrl.subjectSets.filter(subjectSet => subjectSet.id === subjectSetID)
  }
  let canClassify = workflowFromUrl?.grouped ? !!subjectSetID : !!workflowID
  canClassify = subjectSetFromUrl?.isIndexed ? !!subjectID : canClassify 

  return (
    <StandardLayout>

      <Box
        align='center'
        gap='medium'
        pad={{ horizontal: 'small', vertical: 'medium' }}
      >

        <Box as='main' fill='horizontal'>
          {!canClassify && (
            <WorkflowMenu
              subjectSetFromUrl={subjectSetFromUrl}
              workflowFromUrl={workflowFromUrl}
              workflows={workflows}
            />
          )}
          <Grid columns={responsiveColumns} gap='small'>
            <ProjectName />
            <ClassifierWrapper
              onAddToCollection={addToCollection}
              subjectID={subjectID}
              subjectSetID={subjectSetID}
              workflowID={workflowID}
            />
            <ThemeModeToggle />
          </Grid>
          <WorkflowAssignmentModal workflowID={workflowID} />
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
