import { Box } from 'grommet'
import React from 'react'
import styled from 'styled-components'

import Background from '../Background'
import Introduction from '../Introduction'
import WorkflowSelector from '../WorkflowSelector'
import ContentBox from '@shared/components/ContentBox'

const GrowBox = styled(Box)`
  flex-grow: 1;
`

const StyledContentBox = styled(ContentBox)`
  border-color: transparent;
`

function WideLayout (props) {
  const { workflows } = props

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
        <WorkflowSelector workflows={workflows} />
      </StyledContentBox>
    </GrowBox>
  )
}

export default WideLayout
