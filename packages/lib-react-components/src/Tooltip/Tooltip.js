import PropTypes from 'prop-types'
import React from 'react'
import { Box, Drop } from 'grommet'

export default function Tooltip (props) {
  const { align, boxAlign, boxAnimation, boxBackgroundColor, boxPad, children, target } = props
  return (
    <Drop
      align={align}
      target={target}
      {...props}
    >
      <Box
        align={boxAlign}
        animation={boxAnimation}
        background={boxBackgroundColor}
        pad={boxPad}
      >
        {children}
      </Box>
    </Drop>
  )
}

Tooltip.defaultProps = {
  boxAlign: 'center',
  boxBackgroundColor: 'white',
  boxPad: { vertical: 'xsmall', horizontal: 'small' }
}

Tooltip.propTypes = {
  align: PropTypes.objectOf({
    top: PropTypes.oneOf(['top', 'bottom']),
    bottom: PropTypes.oneOf(['top', 'bottom']),
    right: PropTypes.oneOf(['left', 'right']),
    left: PropTypes.oneOf(['left', 'right'])
  }),
  boxAlign: PropTypes.string,
  boxAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  boxBackgroundColor: PropTypes.string,
  boxPad: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  target: PropTypes.object.isRequired
}
