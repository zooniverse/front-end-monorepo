import { Box, Layer } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

function Popup ({ children, closeFn }) {
  return (
    <Layer
      onClickOutside={closeFn}
      onEsc={closeFn}
    >
      <Box pad='medium' direction='column'>
        {children}
      </Box>
    </Layer>
  )
}

Popup.propTypes = {
  children: PropTypes.node,
  closeFn: PropTypes.func.isRequired
}

export default Popup
