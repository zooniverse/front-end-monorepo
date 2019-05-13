import { SpacedText, withResponsiveContext } from '@zooniverse/react-components'
import { string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledText = styled(SpacedText)`
  text-align: center;
  transform: rotate(180deg);
  writing-mode: vertical-lr;
`

function ProjectName (props) {
  const { projectName, screenSize } = props

  if (screenSize === 'small') return null

  return (
    <StyledText
      color={{ dark: 'white', light: 'black' }}
      size='medium'
      weight='bold'
    >
      {projectName}
    </StyledText>
  )
}

ProjectName.defaultProps = {
  screenSize: ''
}

ProjectName.propTypes = {
  projectName: string.isRequired,
  screenSize: string
}

export default withResponsiveContext(ProjectName)
export { ProjectName }