import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import locationValidator from '../../helpers/locationValidator'
import getViewer from '../../helpers/getViewer'
import FrameCarousel from './FrameCarousel'

const StyledSection = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  background: gray;
`

const StyledMainImage = styled.img`
  flex-grow: 2;
  width: 100%;
  height: 100%;
`

class MultiFrameViewer extends React.Component {
  constructor () {
    super()
    // current frame
  }

  render () {
    const { onError, onSubjectReady, subject, subjectReadyState } = this.props
    const currentFrameIndex = parseInt(this.props.subject.metadata.default_frame)
    const mimeTypeKey = Object.keys(this.props.subject.locations[currentFrameIndex])
    const currentFrameLocation = this.props.subject.locations[currentFrameIndex][mimeTypeKey]

    return (
       <StyledSection tabIndex="0" className="subjectcarousel" aria-labelledby="carouselheading">
        <FrameCarousel subject={this.props.subject} />
        <div className="frame-display" role="region" aria-live="polite">
          <StyledMainImage
            role="region"
            aria-live="polite"
            src={currentFrameLocation}
            alt={`Subject ${currentFrameIndex + 1} of ${this.props.subject.locations.length}`}
          />
        </div>
      </StyledSection>
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
    metadata: {
      default_frame: "0"
    }
  }
}

export default MultiFrameViewer
