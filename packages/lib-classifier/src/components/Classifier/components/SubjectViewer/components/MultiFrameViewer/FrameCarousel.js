import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import counterpart from 'counterpart'
import locationValidator from '../../helpers/locationValidator'

import { Button, Box } from 'grommet'
import { FormUp, FormDown } from 'grommet-icons'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export const StyledControlButton = styled(Button)`
  width: 100%;
  svg {
    fill: #FFFFFF;
    stroke: #FFFFFF;
  }
  &:focus, &:hover {
    background: #7fcbce;
    box-shadow: none;
  }
`
export const StyledInput = styled.input`
  clip: rect(0 0 0 0);
  overflow: hidden;
  position: absolute;

  &:checked + img {
    outline: #F0B200 solid;
  }
`

export const StyledImage = styled.img`
  height: 3em;
  width: 3em;
  margin: 0.5em;
  float: center;
  object-fit: cover;
  padding: 0;
`

class FrameCarousel extends React.Component {
  constructor() {
    super()
    this.handlePrevious = this.handlePrevious.bind(this)
    this.handleNext = this.handleNext.bind(this)
  }

  handlePrevious () {
    const { frame, onFrameChange } = this.props
    if (frame > 0) {
      onFrameChange(frame - 1)
    }
  }

  handleNext () {
    const { frame, onFrameChange, subject } = this.props
    if (frame < subject.locations.length) {
      onFrameChange(frame + 1)
    }
  }

  render () {
    const { frame, onFrameChange, locations } = this.props
    const locationElements = locations.map((location, index) => {
      const mimeType = Object.keys(location)[0]
      const url = location[mimeType]
      const activeFrame = frame === index
      return (
        <label key={`${url}-${index}`}>
          <StyledInput
            checked={activeFrame}
            name='frame'
            onChange={() => onFrameChange(index)}
            src={url}
            type='radio'
          />
          <StyledImage src={url} alt={counterpart('MultiFrameViewer.FrameCarousel.thumbnailAltText')} />
        </label>
      )
    })

    return (
      <Box
        align='center'
        alignContent='around'
        className='frames-container'
        direction='column'
        fill='vertical'
        flex={{ shrink: 0 }}
        background={'#FFFFFF'}
        justify='center'
        width={{ 'min': '2em' }}
      >
        <StyledControlButton
          alignSelf='center'
          label={<span><FormUp /><br />{counterpart('MultiFrameViewer.FrameCarousel.previousFrameLabel')}</span>}
          margin={{ 'bottom': '5px' }}
          primary
          disabled={frame === 0}
          onClick={() => this.handlePrevious()}
        />
        <Box
          align='center'
          alignContent='center'
          as='ul'
          background='#FFFFFF'
          border={false}
          direction='column'
          height='100%'
          overflow='scroll'
        >
          {locationElements}
        </Box>
        <StyledControlButton
          alignSelf='center'
          label={<span>{counterpart('MultiFrameViewer.FrameCarousel.nextFrameLabel')}<br /><FormDown /></span>}
          margin={{ 'top': '5px' }}
          primary
          disabled={frame === (subject.locations.length - 1)}
          onClick={() => this.handleNext()}
        />
      </Box>
    )
  }
}

FrameCarousel.propTypes = {
  frame: PropTypes.number.isRequired,
  onFrameChange: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(locationValidator).isRequired
}

export default FrameCarousel
