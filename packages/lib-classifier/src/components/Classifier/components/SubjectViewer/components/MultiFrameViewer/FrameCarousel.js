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
  &:focus {
    background: #7fcbce;
    box-shadow: none;
  }
  &:hover {
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
  render () {
    const locations = this.props.subject.locations.map(location => ({ 'url': location['image/jpeg'] }))
    const locationElements = locations.map((location, index) => {
      // const currentFrameIndex = parseInt(this.props.subject.metadata.default_frame)
      // const currentActive = currentFrameIndex === index
      return (
        <label key={`${location.url}-${index}`}>
          <StyledInput
            type='radio'
            src={location.url}
            name='frame'
          />
          <StyledImage src={location.url} alt={counterpart('MultiFrameViewer.FrameCarousel.thumbnailAltText')} />
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
        />
      </Box>
    )
  }
}

FrameCarousel.propTypes = {
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  })
}

export default FrameCarousel
