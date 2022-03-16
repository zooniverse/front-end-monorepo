import PropTypes from 'prop-types'
import React from 'react'

function SingleTextViewer ({
  content = ''
}) {
  return (
    <div>
      <pre>
        {content}
      </pre>
    </div>
  )
}

SingleTextViewer.propTypes = {
  content: PropTypes.string
}

export default SingleTextViewer
