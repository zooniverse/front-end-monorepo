import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

function ModalBody ({
  children,
  className,
  overflow,
  pad
}) {
  return (
    <Box
      background={{
        dark: 'dark-5',
        light: 'neutral-6'
      }}
      className={className}
      overflow={overflow}
      pad={pad}
    >
      {children}
    </Box>
  )
}

ModalBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

ModalBody.defaultProps = {
  className: '',
  overflow: 'auto',
  pad: {
    bottom: 'medium',
    horizontal: 'medium',
    top: 'small'
  }
}

export default ModalBody
