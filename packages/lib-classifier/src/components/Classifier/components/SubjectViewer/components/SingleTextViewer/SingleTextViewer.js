import PropTypes from 'prop-types'
import React from 'react'

function SingleTextViewer (props) {
  const {
    content
  } = props

  return (
    <div>
      <pre>
        {content}
      </pre>
    </div>
  )
}

SingleTextViewer.defaultProps = {
  content: ''
}

SingleTextViewer.propTypes = {
  content: PropTypes.string
}

export default SingleTextViewer
