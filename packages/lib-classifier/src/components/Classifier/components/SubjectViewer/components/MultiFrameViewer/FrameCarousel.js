import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import locationValidator from '../../helpers/locationValidator'
import getViewer from '../../helpers/getViewer'

class FrameCarousel extends React.Component {
  constructor () {
    super()
    // current frame
  }

  render () {
    return (
      <h3 id="subjectcarousel" className="visuallyhidden">
        Carousel of Subjects
      </h3>
    )
  }
}

FrameCarousel.propTypes = {
}

FrameCarousel.defaultProps = {
}

export default FrameCarousel
