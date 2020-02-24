import counterpart from 'counterpart'
import { Button, Box } from 'grommet'
import { FormUp, FormDown } from 'grommet-icons'
import { tint } from 'polished'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css, withTheme } from 'styled-components'

import locationValidator from '../../helpers/locationValidator'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export const StyledControlButton = styled(Button)`
  ${props => props.theme && css`
    color: ${props.theme.global.colors['neutral-6']};
    background: ${props.theme.global.colors.brand};

    &:hover, &:focus {
      background: ${tint(0.5, props.theme.global.colors.brand)};
      box-shadow: none;
    }
  `}
`

export function PreviousLabel () {
  return (
    <Box
      as='span'
      align='center'
      direction='column'
    >
      <FormUp color='neutral-6' />
      {counterpart('MultiFrameViewer.FrameCarousel.previousFrameLabel')}
    </Box>
  )
}

export function NextLabel () {
  return (
    <Box
      as='span'
      align='center'
      direction='column'
    >
      {counterpart('MultiFrameViewer.FrameCarousel.nextFrameLabel')}
      <FormDown color='neutral-6' />
    </Box>
  )
}

export const StyledInput = styled.input`
  ${props => props.theme && css`
    &:checked + img {
      outline: ${props.theme.global.colors['neutral-4']} solid;
    }
  `}
  clip: rect(0 0 0 0);
  overflow: hidden;
  position: absolute;
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
  constructor () {
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
    const { frame, onFrameChange, locations } = this.props
    if (frame < locations.length) {
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
        background='neutral-6'
        direction='column'
        fill='vertical'
        width={{ 'min': '2em' }}
      >
        <StyledControlButton
          disabled={frame === 0}
          fill='horizontal'
          label={<PreviousLabel />}
          onClick={() => this.handlePrevious()}
        />
        <Box
          as='ul'
          direction='column'
          fill
          align='center'
          overflow='scroll'
        >
          {locationElements}
        </Box>
        <StyledControlButton
          align='center'
          disabled={frame === (locations.length - 1)}
          fill='horizontal'
          label={<NextLabel />}
          onClick={() => this.handleNext()}
        />
      </Box>
    )
  }
}

FrameCarousel.propTypes = {
  frame: PropTypes.number.isRequired,
  locations: PropTypes.arrayOf(locationValidator).isRequired,
  onFrameChange: PropTypes.func.isRequired,
  theme: PropTypes.object
}

FrameCarousel.defaultProps = {
  theme: {
    global: {
      colors: {}
    }
  }
}

export default withTheme(FrameCarousel)
export { FrameCarousel }
