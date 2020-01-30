import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import counterpart from 'counterpart'
import locationValidator from '../../helpers/locationValidator'

import { Button, Box } from 'grommet'
import { FormUp, FormDown } from 'grommet-icons'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledH3 = styled.h3`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`

const StyledControlButton = styled(Button)`
  box-shadow: none
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

const StyledButtons = styled.button`
  box-sizing: border-box;
  border: 3px solid transparent;
  background: #FFFFFF;
  margin: 5px 5px 5px 5px;
  padding: 0;
  line-height: 0;
  &.active {
    box-sizing: border-box;
    border: 3px solid #F0B200;
  }
  &:hover {
    box-sizing: border-box;
    border: 3px solid #F0B200;
  }
  &:focus {
    box-sizing: border-box;
    border: 3px solid #F0B200;
    outline: none;
  }
`

const StyledImage = styled.img`
  height: 4em;
  width: 4em;
  float: center;
  object-fit: cover;
  padding: 0;
`

class FrameCarousel extends React.Component {
  render () {
    const locations = this.props.subject.locations.map(location => ({ 'url': location['image/jpeg'] }))
    const locationElements = locations.map((location, index) => {
      const currentFrameIndex = parseInt(this.props.subject.metadata.default_frame)
      const currentActive = currentFrameIndex === index
      return (
        <li key={index} className={`frame-${index}`}>
          <StyledButtons
            key={index}
            value={index}
            data-slide={index}
            className={currentActive ? 'active' : ''}
          >
            <StyledImage
              className='frame-image'
              src={location.url}
              alt={counterpart('MultiFrameViewer.FrameCarousel.thumbnailAltText')}
            />
          </StyledButtons>
        </li>
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
        justify={'center'}
        width={{ 'min': '2em' }}
      >
        <StyledH3 id='subjectcarousel' className='visuallyhidden'>
          Carousel of Subjects
        </StyledH3>
        <StyledControlButton
          alignSelf='center'
          label={<span><FormUp /><br />{counterpart('MultiFrameViewer.FrameCarousel.previousFrameLabel')}</span>}
          hoverIndicator={{ color: '#7fcbce'}}
          focusIndicator={{ color: '#7fcbce'}}
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
          hoverIndicator={{ color: '#7fcbce'}}
          focusIndicator={{ color: '#7fcbce'}}
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
