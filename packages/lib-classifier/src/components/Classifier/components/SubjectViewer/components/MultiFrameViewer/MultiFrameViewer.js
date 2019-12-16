import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import locationValidator from '../../helpers/locationValidator'

class MultiFrameViewer extends React.Component {
  constructor () {
    super()
    // current frame
  }

  render () {
    // carousel component
    return (
      <div>
        <p>MultiFrameViewer Placeholder</p>
      </div>
    )
  }
}

MultiFrameViewer.propTypes = {
  loadingState: PropTypes.string,
  onError: PropTypes.func,
  onReady: PropTypes.func,
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator),
    metadata: PropTypes.shape({
      default_frame: PropTypes.number
    })
  })
}

MultiFrameViewer.defaultProps = {
  subject: {
    default_frame: 0
  }
}

export default MultiFrameViewer
