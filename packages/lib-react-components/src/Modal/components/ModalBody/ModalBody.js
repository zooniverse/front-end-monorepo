import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

function ModalBody ({
  children,
  className,
  colorTheme
}) {
  const background = (colorTheme === 'light') ? 'white' : 'dark-5'
  return (
    <Box
      background={background}
      className={className}
      pad='medium'
    >
      {children}
    </Box>
  )
}

ModalBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  colorTheme: PropTypes.oneOf(['light', 'dark'])
}

ModalBody.defaultProps = {
  className: '',
  colorTheme: 'light'
}

export default ModalBody
