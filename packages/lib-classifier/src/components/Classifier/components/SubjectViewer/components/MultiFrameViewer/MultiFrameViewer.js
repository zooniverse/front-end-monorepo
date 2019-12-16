import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import locationValidator from '../../helpers/locationValidator'
import getViewer from '../../helpers/getViewer'
import FrameCarousel from './FrameCarousel'

class MultiFrameViewer extends React.Component {
  constructor () {
    super()
    // current frame
  }

  render () {
    // carousel component
    const { onError, onSubjectReady, subject, subjectReadyState } = this.props
    const currentFrameIndex = parseInt(this.props.subject.metadata.default_frame)
    const mimeTypeKey = Object.keys(this.props.subject.locations[currentFrameIndex])
    console.log("mimeTypeKey", mimeTypeKey)
    const currentFrameLocation = this.props.subject.locations[currentFrameIndex][mimeTypeKey]
    console.log("currentFrameLocation", currentFrameLocation)
    //         <FrameContainer
        //   currentIndex={this.state.currentFrameIndex}
        //   setCurrentSubjectIndex={this.currentFrameLocation}
        //   locations={this.props.subject.locations}
        // />
    return (
       <section tabIndex="0" className="subjectcarousel" aria-labelledby="carouselheading">
        <FrameCarousel />
        <div className="frame-display" role="region" aria-live="polite">
          <img src={currentFrameLocation} alt={`Subject ${currentFrameIndex + 1} of ${this.props.subject.locations.length}`}/>
        </div>
      </section>
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
      default_frame: PropTypes.string
    })
  })
}

MultiFrameViewer.defaultProps = {
  subject: {
    default_frame: 0
  }
}

export default MultiFrameViewer
