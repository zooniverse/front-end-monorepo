import { Box, Grid } from 'grommet'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Modal } from '@zooniverse/react-components'

import Background from '../Background'
import Introduction from '../Introduction'
import WorkflowSelector from '@shared/components/WorkflowSelector'
import { SubjectSetPicker } from '@shared/components/WorkflowSelector/components'
import ContentBox from '@shared/components/ContentBox'

function NarrowLayout (props) {
  const { workflows } = props
  const [ activeWorkflow, setActiveWorkflow ] = useState()
  const router = useRouter()
  const { owner, project } = router?.query || {}

  function onSelectWorkflow(event, workflow) {
    if (workflow.grouped) {
      event.preventDefault()
      setActiveWorkflow(workflow)
      return false
    }
    return true
  }

  return (
    <Box
      align='stretch'
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      direction='column'
      justify='between'
    >
      <Background />
      <Grid margin={{ top: 'medium-neg', horizontal: 'medium' }}>
        <ContentBox gap='medium' >
          <Introduction />
          <WorkflowSelector
            onSelect={onSelectWorkflow}
            workflows={workflows}
          />
          {activeWorkflow &&
            <Modal
              active
              closeFn={() => setActiveWorkflow(null)}
              headingBackground='brand'
              title={activeWorkflow.displayName || 'Choose a subject set'}
              titleColor='neutral-6'
            >
              <SubjectSetPicker
                owner={owner}
                project={project}
                workflow={activeWorkflow}
              />
            </Modal>
          }
        </ContentBox>
      </Grid>
    </Box>
  )
}

NarrowLayout.defaultProps = {
  workflows: []
}

export default NarrowLayout
