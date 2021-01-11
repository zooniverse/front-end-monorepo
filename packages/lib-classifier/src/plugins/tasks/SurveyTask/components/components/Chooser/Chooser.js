import PropTypes from 'prop-types'
import React from 'react'
import { Box } from 'grommet'

export default function Chooser (props) {
  const {
    autoFocus,
    disabled,
    task,
    value,
    updateAnnotation
  } = props

  return (
    <Box>
      <p>Chooser goes here.</p>
    </Box>
  )
}

Chooser.defaultProps = {
  autoFocus: false,
  disabled: false,
  updateAnnotation: () => {}
}

Chooser.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  task: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    taskKey: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
  value: PropTypes.string.isRequired,
  updateAnnotation: PropTypes.func
}
