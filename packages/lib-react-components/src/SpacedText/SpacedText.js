import { Text } from 'grommet'
import styled, { css } from 'styled-components'
import pxToRem from '../helpers/pxToRem'
import { bool, node, objectOf, oneOfType, string  } from 'prop-types'

const letterSpacing = pxToRem(1)
const StyledText = styled(Text)`
  letter-spacing: ${letterSpacing};
  ${props =>
    props.uppercase
      ? css`text-transform: uppercase;`
      : css`text-transform: normal;`}
`

export default function SpacedText({
  children,
  margin = 'none',
  size = 'small',
  uppercase = true,
  weight = 'normal',
  ...props
}) {
	console.log('STyled text in here damnit')
  return (
    <StyledText
      margin={margin}
      size={size}
      uppercase={uppercase}
      weight={weight}
      {...props}
    >
      {children}
    </StyledText>
  )
}

SpacedText.propTypes = {
  /** (node): Required. The child of the component. Usually text. */
  children: node.isRequired,
  /** (string): */
  margin: oneOfType([
     /** (string): Maps to preset sizes defined in the grommet theme. */
    string,
    /** (object): An object can be specified to distinguish horizontal margin, vertical margin, and margin on a particular side, i.e. `{ top: 'small' }` */
    objectOf(string)
  ]),
  size: string,
  /** (boolean): Handled by styled-components. */
  uppercase: bool,
  /** (string): Same as the `weight` prop for Grommet's `Text` component and used by the inner `SpacedText` component. */
  weight: string
}
