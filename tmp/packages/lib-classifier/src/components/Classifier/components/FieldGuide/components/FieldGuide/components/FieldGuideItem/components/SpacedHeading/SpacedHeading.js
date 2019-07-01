import { SpacedText } from '@zooniverse/react-components'
import { Heading } from 'grommet'
import { node, string } from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledHeading = styled(Heading)`
  font-size: 100%;
  line-height: 1;
`

function SpacedHeading (props) {
  const { children, className, level } = props
  return (
    <StyledHeading className={className} level={level} size='medium' {...props}>
      <SpacedText color={{ dark: 'white', light: 'black' }} weight='bold'>
        {children}
      </SpacedText>
    </StyledHeading>
  )
}

SpacedHeading.propTypes = {
  children: node,
  className: string,
  level: string
}

export default SpacedHeading
