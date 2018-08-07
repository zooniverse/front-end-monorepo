import counterpart from 'counterpart'
import { Box, Button as GrommetButton } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

function Button ({ label, onClick, ...buttonProps }) {
  return (
    <Box
      align='center'
      direction='row'
      justify='center'
      margin={{ top: 'medium' }}
    >
      <GrommetButton
        label={label}
        onClick={onClick}
        primary
        {...buttonProps}
      />
    </Box>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Button
