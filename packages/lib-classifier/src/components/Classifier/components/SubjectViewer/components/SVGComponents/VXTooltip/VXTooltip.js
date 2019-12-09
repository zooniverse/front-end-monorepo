import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from '@vx/tooltip'
import { withBoundingRects, withBoundingRectsProps } from '@vx/bounds'
import { Box } from 'grommet'
import { SpacedText } from '@zooniverse/react-components'
import Triangle from '../../../../shared/Triangle'
import zooTheme from '@zooniverse/grommet-theme'

function getNumberValue (string) {
  const splitString = string.split('px')
  return +splitString[0]
}

function VXTooltip (props) {
  const {
    backgroundColor,
    label,
    left,
    parentRect,
    pointDirection,
    rect,
    top: initialTop
  } = props
  const fontSize = zooTheme.text.small.size
  const horizontalPadding = zooTheme.global.edgeSize.medium
  const verticalPadding = zooTheme.global.edgeSize.xsmall
  const tooltipStyles = { background: 'transparent', borderRadius: 'none', boxShadow: 'none', padding: 0, zIndex: '1' }
  const triangleHeight = 10
  const triangleWidth = 20
  const heightOfTooltip = getNumberValue(fontSize) + (getNumberValue(verticalPadding) * 2) + (triangleHeight * 1.5)
  const widthOfTooltip = getNumberValue(fontSize) + (getNumberValue(horizontalPadding) * 2) + (triangleHeight * 1.5)
  // let leftPosition = initialLeft
  let topPosition = initialTop - heightOfTooltip

  if (parentRect && rect) {
    console.log('parentRect', parentRect)
    console.log('rect', rect)

    if (rect.top < 0) {
      topPosition = initialTop
    }
  }

  return (
    <Tooltip
      left={left}
      top={topPosition}
      style={tooltipStyles}
    >
      <Box
        background={{ color: backgroundColor, dark: true }}
        elevation='medium'
        pad={{ horizontal: 'medium', vertical: 'xsmall' }}
        responsive={false}
      >
        <SpacedText weight='bold'>{label}</SpacedText>
      </Box>
      <Triangle
        backgroundColor='black'
        height={triangleHeight}
        justify='center'
        pointDirection={pointDirection}
        width={triangleWidth}
      />
    </Tooltip>
  )
}

VXTooltip.defaultProps = {
  backgroundColor: 'rgb(0,0,0,0.5)',
  pointDirection: 'down',
  pointPosition: 'center'
}

VXTooltip.propTypes = {
  ...withBoundingRectsProps,
  backgroundColor: PropTypes.string,
  label: PropTypes.string.isRequired,
  left: PropTypes.number.isRequired,
  pointDirection: PropTypes.oneOf(['down', 'left', 'right', 'up']),
  pointPosition: PropTypes.oneOf(['start', 'center', 'end']),
  top: PropTypes.number.isRequired
}

export default withBoundingRects(VXTooltip)
export { VXTooltip }