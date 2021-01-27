import { Box, Grid } from 'grommet'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { arrayOf, func, shape, string } from 'prop-types'
import React, { useState } from 'react'
import { Modal, withResponsiveContext } from '@zooniverse/react-components'

import ThemeModeToggle from '@components/ThemeModeToggle'
import ProjectName from '@components/ProjectName'
import ConnectWithProject from '@shared/components/ConnectWithProject'
import ProjectStatistics from '@shared/components/ProjectStatistics'
import FinishedForTheDay from './components/FinishedForTheDay'
import RecentSubjects from './components/RecentSubjects'
import YourStats from './components/YourStats'
import StandardLayout from '@shared/components/StandardLayout'

import WorkflowSelector from '@shared/components/WorkflowSelector'
import SubjectSetPicker from '@shared/components/SubjectSetPicker'

const ClassifierWrapper = dynamic(() =>
  import('./components/ClassifierWrapper'), { ssr: false }
)

function ClassifyPage (props) {
  const { addToCollection, screenSize, subjectSetID, workflowID, workflows } = props
  const responsiveColumns = (screenSize === 'small')
    ? ['auto']
    : ['1em', 'auto', '1em']

  const [ workflowFromUrl ] = workflows.filter(workflow => workflow.id === workflowID)
  const canClassify = workflowFromUrl?.grouped ? !!subjectSetID : !!workflowID
  const router = useRouter()
  const { owner, project } = router?.query || {}
  const [ activeWorkflow, setActiveWorkflow ] = useState(workflowFromUrl)

  function onSelectWorkflow(event, workflow) {
    if (workflow.grouped) {
      event.preventDefault()
      setActiveWorkflow(workflow)
      return false
    }
    return true
  }

  function onClose() {
    setActiveWorkflow(null)
  }

  return (
    <StandardLayout>

      <Box
        align='center'
        gap='medium'
        pad={{ horizontal: 'small', vertical: 'medium' }}
      >

        <Box as='main' fill='horizontal'>
          {!canClassify && (
            <Modal
              active
              closeFn={onClose}
              headingBackground='brand'
              title={activeWorkflow ? (activeWorkflow.displayName || 'Choose a subject set') : 'Choose a workflow'}
              titleColor='neutral-6'
            >
              {!activeWorkflow ?
                <WorkflowSelector
                  onSelect={onSelectWorkflow}
                  workflows={workflows}
                /> :
                <SubjectSetPicker
                  onClose={onClose}
                  owner={owner}
                  project={project}
                  workflow={activeWorkflow}
                />
              }
            </Modal>
          )}
          <Grid columns={responsiveColumns} gap='small'>
            <ProjectName />
            <ClassifierWrapper
              onAddToCollection={addToCollection}
              subjectSetID={subjectSetID}
              workflowID={workflowID}
            />
            <ThemeModeToggle />
          </Grid>
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

ClassifyPage.defaultProps = {
  workflows: []
}

ClassifyPage.propTypes = {
  addToCollection: func,
  screenSize: string,
  subjectSetID: string,
  workflowID: string,
  workflows: arrayOf(shape({
    id: string.isRequired
  }))
}

export default withResponsiveContext(ClassifyPage)
export { ClassifyPage }
