import SpacedText from '../SpacedText'
import { Heading } from 'grommet'
import { node, number, object, oneOfType, string } from 'prop-types'
import React from 'react'

function SpacedHeading(props) {
  const { 
    children,
    className = '',
    color = {
      dark: 'neutral-6',
      light: 'black'
    },
    level = 2,
    size = 'medium',
    weight = 'bold'
  } = props
  return (
    <Heading className={className} level={level} size={size} {...props}>
      <SpacedText color={color} weight={weight}>
        {children}
      </SpacedText>
    </Heading>
  )
}

SpacedHeading.propTypes = {
  children: node.isRequired,
  className: string,
  color: oneOfType([ object, string ]),
  level: number,
  size: string,
  weight: string
}

export default SpacedHeading
