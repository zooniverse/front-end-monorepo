import React from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import Axis from './components/Axis'

function Axes ({ axesConfig, ...rest }) {
  const { xAxis, yAxis } = axesConfig
  return (
    <Group>
      <Axis axis={yAxis} {...rest} />
      <Axis axis={xAxis} {...rest} />
    </Group>
  )
}

export default Axes