import React from 'react'
import PropTypes from 'prop-types'
import { withTooltip, TooltipWithBounds } from '@vx/tooltip'

export default function VXTooltip ({ label, left, top }) {
  return (
    <TooltipWithBounds
      left={left}
      top={top}
    >
      {label}
    </TooltipWithBounds>
  )
}

VXTooltip.propTypes = {
  label: PropTypes.string,
  left: PropTypes.number,
  top: PropTypes.number
}