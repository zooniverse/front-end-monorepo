import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

function SingleTextViewer ({
  content = ''
}) {
  return (
    <Box
      pad='xsmall'
    >
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        {content}
      </pre>
    </Box>
  )
}

SingleTextViewer.propTypes = {
  content: PropTypes.string
}

export default SingleTextViewer
