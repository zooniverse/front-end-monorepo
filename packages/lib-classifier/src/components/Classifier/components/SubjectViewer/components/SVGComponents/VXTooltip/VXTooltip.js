import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import { Tooltip } from '@vx/tooltip'
import { withBoundingRects, withBoundingRectsProps } from '@vx/bounds'
import { Box } from 'grommet'
import { SpacedText } from '@zooniverse/react-components'
import Triangle from '../../../../shared/Triangle'

function getNumberValue (string) {
  const splitString = string.split('px')
  return +splitString[0]
}

function VXTooltip (props) {
  const {
    backgroundColor,
    label,
    left: initialLeft,
    parentRect,
    pointDirection,
    pointPosition,
    rect,
    theme,
    top: initialTop
  } = props
  const fontSize = theme.text.small.size
  const horizontalPadding = theme.global.edgeSize.medium
  const verticalPadding = theme.global.edgeSize.xsmall
  const tooltipStyles = { background: 'transparent', borderRadius: 'none', boxShadow: 'none', padding: 0, zIndex: '1' }
  const triangleHeight = 10
  const triangleWidth = 20
  const heightOfTooltip = getNumberValue(fontSize) + (getNumberValue(verticalPadding) * 2) + (triangleHeight * 1.5)
  const widthOfTooltip = getNumberValue(fontSize) + (getNumberValue(horizontalPadding) * 2) + (triangleHeight * 1.5)
  let topPosition = initialTop - heightOfTooltip
  let leftPosition = initialLeft
  if (parentRect && rect) {
    console.log('parentRect', parentRect)
    console.log('rect', rect)
    console.log('left', leftPosition)

    if (rect.top < 0) {
      topPosition = initialTop
    }
  }

  return (
    <Tooltip
      left={leftPosition}
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
        backgroundColor={backgroundColor}
        height={triangleHeight}
        justify={pointPosition}
        pad='none'
        pointDirection={pointDirection}
        width={triangleWidth}
      />
    </Tooltip>
  )
}

VXTooltip.defaultProps = {
  backgroundColor: 'black',
  pointDirection: 'down',
  pointPosition: 'center',
  theme: {
    global: {
      edgeSize: {}
    },
    text: {
      small: {}
    }
  }
}

VXTooltip.propTypes = {
  ...withBoundingRectsProps,
  backgroundColor: PropTypes.string,
  label: PropTypes.string.isRequired,
  left: PropTypes.number.isRequired,
  pointDirection: PropTypes.oneOf(['down', 'left', 'right', 'up']),
  pointPosition: PropTypes.oneOf(['start', 'center', 'end']),
  theme: PropTypes.object,
  top: PropTypes.number.isRequired
}

export default withTheme(withBoundingRects(VXTooltip))
export { VXTooltip }