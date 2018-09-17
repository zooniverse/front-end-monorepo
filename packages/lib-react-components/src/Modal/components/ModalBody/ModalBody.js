import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'

function ModalBody ({
  children,
  colorTheme
}) {
  const background = zooTheme[colorTheme].colors.modal.background
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
