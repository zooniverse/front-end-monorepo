import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledSVG = styled.svg`
  cursor: ${props => props.dragging ? 'move' : 'inherit'}
`

const Chart = React.forwardRef(function Chart({ children, height, width, ...rest }, ref) {
  return (
    <svg height={height} ref={ref} width={width} {...rest}>
      {children}
    </svg>
  )
})

Chart.defaultProps = {
  height: '100%', 
  width: '100%'
}

Chart.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string
}

export default Chart