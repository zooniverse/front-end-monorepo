import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

function ModalBody ({
  children,
  colorTheme
}) {
  const background = (colorTheme === 'light') ? 'white' : 'dark-5'
  return (
    <Box
      background={background}
      pad='medium'
    >
      {children}
    </Box>
  )
}

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
  colorTheme: PropTypes.oneOf(['light', 'dark'])
}

ModalBody.defaultProps = {
  colorTheme: 'light'
}

export default ModalBody
