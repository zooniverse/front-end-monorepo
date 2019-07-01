import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

function ModalBody ({
  children,
  className,
  pad
}) {
  return (
    <Box
      background={{
        dark: 'dark-5',
        light: 'white'
      }}
      className={className}
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
  pad: 'medium'
}

export default ModalBody
