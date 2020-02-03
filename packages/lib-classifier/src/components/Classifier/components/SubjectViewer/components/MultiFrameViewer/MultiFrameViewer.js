import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import locationValidator from '../../helpers/locationValidator'
import FrameCarousel from './FrameCarousel'
import { Box } from 'grommet'

const StyledMainImage = styled.img`
  flex-grow: 2;
  width: 100%;
`

class MultiFrameViewer extends React.Component {
  render () {
    const currentFrameIndex = parseInt(this.props.subject.metadata.default_frame)
    const mimeTypeKey = Object.keys(this.props.subject.locations[currentFrameIndex])
    const currentFrameLocation = this.props.subject.locations[currentFrameIndex][mimeTypeKey]
    return (
      <Box
        align='center'
        alignContent='center'
        direction='row'
        className='subjectcarousel'
      >
        <FrameCarousel subject={this.props.subject} />
        <div className='frame-display' role='region' aria-live='polite'>
          <StyledMainImage
            role='region'
            aria-live='polite'
            src={currentFrameLocation}
            alt={`Subject ${currentFrameIndex + 1} of ${this.props.subject.locations.length}`}
          />
        </div>
      </Box>
    )
  }
}

MultiFrameViewer.propTypes = {
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
      default_frame: '0'
    }
  }
}

export default MultiFrameViewer
