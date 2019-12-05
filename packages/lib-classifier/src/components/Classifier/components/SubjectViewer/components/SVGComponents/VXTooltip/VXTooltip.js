import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from '@vx/tooltip'
import { Box } from 'grommet'
import { SpacedText } from '@zooniverse/react-components'
import Triangle from '../../../../Banners/components/Banner/components/Triangle'
import zooTheme from '@zooniverse/grommet-theme'

function getNumberValue (string) {
  const splitString = string.split('px')
  return +splitString[0]
}

export default function VXTooltip ({ backgroundColor, label, left, top }) {
  // vx's Tooltip isn't easy to style. Have to pass in styles directly.
  const fontSize = zooTheme.text.small.size
  const padding = zooTheme.global.edgeSize.xsmall

  const triangleHeight = 10
  const triangleWidth = 20
  const topPosition = top - getNumberValue(fontSize) - (getNumberValue(padding) * 2) - (triangleHeight * 2)
  return (
    <Tooltip
      left={left}
      top={topPosition}
      style={{ background: 'transparent', borderRadius: 'none', boxShadow: 'none', padding: 0 }}
    >
      <Box
        background={{ color: backgroundColor, dark: true }}
        elevation='medium'
        pad={{ horizontal: 'medium', vertical: 'xsmall' }}
      >
        <SpacedText weight='bold'>{label}</SpacedText>
      </Box>
      <Triangle
        backgroundColor='black'
        height={triangleHeight}
        justify='center'
        pointDirection='down'
        width={triangleWidth}
      />
    </Tooltip>
  )
}

VXTooltip.defaultProps = {
  backgroundColor: 'rgb(0,0,0,0.5)'
}

VXTooltip.propTypes = {
  label: PropTypes.string,
  left: PropTypes.number,
  top: PropTypes.number
}