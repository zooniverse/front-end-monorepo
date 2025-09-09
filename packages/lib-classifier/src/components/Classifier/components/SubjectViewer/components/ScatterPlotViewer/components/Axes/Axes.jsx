import PropTypes from 'prop-types'
import styled from 'styled-components'

import Axis from './components/Axis'

export const StyledAxis = styled(Axis)`
  .Axis__label {
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1px;
  }
`

function Axes ({ axesConfig, className, ...rest }) {
  const { color, xAxis, yAxis } = axesConfig
  return (
    <>
      <StyledAxis axis={yAxis} className={className} color={color} {...rest} />
      <StyledAxis axis={xAxis} className={className} color={color} {...rest} />
    </>
  )
}

Axes.propTypes = {
  axesConfig: PropTypes.shape({
    xAxis: PropTypes.object,
    yAxis: PropTypes.object
  })
}

export default Axes
