import { Box } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import styled from 'styled-components'

import Background from '../Background'
import Introduction from '../Introduction'
import WorkflowMenu from '../WorkflowMenu'
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
        <WorkflowMenu
          workflows={workflows}
        />
      </StyledContentBox>
    </GrowBox>
  )
}

WideLayout.defaultProps = {
  workflows: []
}

WideLayout.propTypes = {
  workflows: arrayOf(shape({
    id: string.isRequired
  }))
}

export default WideLayout
