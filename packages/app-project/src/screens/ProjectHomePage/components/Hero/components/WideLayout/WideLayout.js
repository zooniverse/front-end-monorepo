import { Box } from 'grommet'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal } from '@zooniverse/react-components'

import Background from '../Background'
import Introduction from '../Introduction'
import WorkflowSelector from '@shared/components/WorkflowSelector'
import { SubjectSetPicker } from '@shared/components/WorkflowSelector/components'
import ContentBox from '@shared/components/ContentBox'

const GrowBox = styled(Box)`
  flex-grow: 1;
`

const StyledContentBox = styled(ContentBox)`
  border-color: transparent;
`

function WideLayout (props) {
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
    <GrowBox align='stretch' direction='row' justify='between'>
      <Box width='62%'>
        <Background />
      </Box>
      <StyledContentBox
        gap='small'
        justify='between'
        pad='medium'
        width='38%'
      >
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
      </StyledContentBox>
    </GrowBox>
  )
}

export default WideLayout
