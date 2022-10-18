import SpacedText from '../SpacedText/index.js'
import { Heading } from 'grommet'
import { node, number, object, oneOfType, string } from 'prop-types'
import React from 'react'

function SpacedHeading({
  children,
  className = '',
  color = {
    dark: 'neutral-6',
    light: 'black'
  },
  level = 2,
  size = 'medium',
  weight = 'bold',
  ...props
}) {
  return (
    <Heading className={className} level={level} size={size} {...props}>
      <SpacedText color={color} weight={weight}>
        {children}
      </SpacedText>
    </Heading>
  )
}

SpacedHeading.propTypes = {
  /** (node) Required. The child of the component. Usually text. */
  children: node.isRequired,
  /** (string): A class name to give to the component. */
  className: string,
  /** (string or object): The color of the text for the inner `SpacedText` component. Uses the same values accepted by Grommet's `Text` component and accepts the variable names for colors from Zooniverse's grommet theme. */
  color: oneOfType([ object, string ]),
  /** (number): Same as Grommet's `Heading` `level` prop. Maps to h1, h2, h3, h4, h5, h6. */
  level: number,
  /** (string): Maps to preset sizes defined in the grommet theme. */
  size: string,
  /** (string): Same as the `weight` prop for Grommet's `Text` component and used by the inner `SpacedText` component. */
  weight: string
}

export default SpacedHeading
