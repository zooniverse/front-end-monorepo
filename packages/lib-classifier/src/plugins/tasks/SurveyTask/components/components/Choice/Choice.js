import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

export default function Choice (props) {
  const {
    choiceId
  } = props

  return (
    <Box>
      Choice content for {choiceId}
    </Box>
  )
}

Choice.defaultProps = {
  choiceId: ''
}

Choice.propTypes = {
  choiceId: PropTypes.string
}
