import { SpacedText } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledText = styled(SpacedText)`
  transform: rotate(180deg);
  writing-mode: vertical-lr;
`

function ProjectName (props) {
  const { projectName } = props
  return (
    <Box pad={{ bottom: 'small', left: 'small', top: 'medium' }}>
      <StyledText color={{ dark: 'white', light: 'black' }} size='medium' weight='bold'>
        {projectName}
      </StyledText>
    </Box>
  )
}

ProjectName.propTypes = {
  projectName: string
}

export default ProjectName
