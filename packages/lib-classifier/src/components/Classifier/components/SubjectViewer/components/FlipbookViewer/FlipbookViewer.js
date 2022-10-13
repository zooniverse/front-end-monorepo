import React from 'react'
import { Box } from 'grommet'
import PropTypes from 'prop-types'
import locationValidator from '../../helpers/locationValidator'

function FlipbookViewer({ subject }) {
  return (
    <Box>
      This is the flipbook viewer. Subject locations: {subject?.locations?.length}
    </Box>
  )
}

FlipbookViewer.propTypes = {
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  }).isRequired
}

export default FlipbookViewer
