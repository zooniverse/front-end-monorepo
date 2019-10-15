import React from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import Axis from './components/Axis'
import { MARGIN, PADDING } from '../../helpers/constants'

function Axes ({ axesConfig, ...rest }) {
  const { xAxis, yAxis } = axesConfig
  return (
    <Group left={MARGIN}>
      <Axis axis={yAxis} {...rest} />
      <Axis axis={xAxis} {...rest} />
    </Group>
  )
}

Axes.propTypes = {
  axesConfig: PropTypes.shape({
    xAxis: PropTypes.object,
    yAxis: PropTypes.object
  })
}

export default Axes