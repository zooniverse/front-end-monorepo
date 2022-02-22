import { Button, Box } from 'grommet'
import { FormUp, FormDown, More } from 'grommet-icons'
import { tint } from 'polished'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css, withTheme } from 'styled-components'
import { Media } from '@zooniverse/react-components'
import { useTranslation, withTranslation } from 'react-i18next'

import locationValidator from '../../helpers/locationValidator'

export const StyledControlButton = styled(Button)`
  ${props => props.theme && css`
    color: ${props.theme.global.colors['neutral-6']};
    background: ${props.theme.global.colors.brand};

    &:focus:not(:disabled), &:hover:not(:disabled) {
      background: ${tint(0.5, props.theme.global.colors.brand)};
      box-shadow: none;
    }
  `}
`

export function PreviousLabel () {
  const { t } = useTranslation('components')
  return (
    <Box
      as='span'
      align='center'
      direction='column'
    >
      <FormUp color='neutral-6' />
      {t('SubjectViewer.MultiFrameViewer.FrameCarousel.previousFrameLabel')}
    </Box>
  )
}

export function NextLabel () {
  const { t } = useTranslation('components')
  return (
    <Box
      as='span'
      align='center'
      direction='column'
    >
      {t('SubjectViewer.MultiFrameViewer.FrameCarousel.nextFrameLabel')}
      <FormDown color='neutral-6' />
    </Box>
  )
}

// creating StyledMedia allows input state dependent styles as defined in StyledFrame
export const StyledMedia = styled(Media)``

export const StyledFrame = styled.label`
  ${props => props.theme && css`
    input:checked + ${StyledMedia} {
      border: solid ${props.theme.global.colors['neutral-2']};
    }
    
    input:focus + ${StyledMedia} {
      outline: 2px solid ${tint(0.5, props.theme.global.colors.brand)};
    }

    input:hover + ${StyledMedia} {
      outline: 2px solid ${tint(0.5, props.theme.global.colors.brand)};
    }
  `}

  height: 40px;
  margin: 5px 0;
  width: 40px;
            
  &:first-child {
    margin-top: 14px;
  }

  &:last-child {
    margin-bottom: 14px;
  }

  input {
    opacity: 0.01;
    position: absolute;
  }

  :hover {
    cursor: pointer;
  }
`

export const StyledFrameList = styled.ul`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  margin: 0;
  overflow: auto;
  padding: 0;
  position: relative;
  scroll-behavior: smooth;
`

class FrameCarousel extends React.Component {
  constructor () {
    super()
    this.handleScroll = this.handleScroll.bind(this)
    this.handlePrevious = this.handlePrevious.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.activeLabel = React.createRef()
    this.frameList = React.createRef()
  }

  componentDidMount () {
    this.handleScroll()
  }

  componentDidUpdate (prevProps) {
    const { frame } = this.props
    if (prevProps.frame !== frame) {
      this.handleScroll()
    }
  }

  handleScroll () {
    const labelIsAboveContainerTop = this.activeLabel.current?.offsetTop <= this.frameList.current?.scrollTop
    const labelIsBelowContainerBottom = this.activeLabel.current?.offsetTop >= (this.frameList.current?.scrollTop + this.frameList.current?.clientHeight)

    if (labelIsAboveContainerTop || labelIsBelowContainerBottom) {
      const newContainerTopPosition = this.activeLabel.current.offsetTop - this.activeLabel.current.offsetHeight
      this.frameList.current.scrollTop = newContainerTopPosition
    }
  }

  handleFrameChange (frameIndex) {
    const { onFrameChange } = this.props
    onFrameChange(frameIndex)
  }

  handlePrevious () {
    const { frame } = this.props
    if (frame > 0) {
      this.handleFrameChange(frame - 1)
    }
  }

  handleNext () {
    const { frame, locations } = this.props
    if (frame < locations.length) {
      this.handleFrameChange(frame + 1)
    }
  }

  render () {
    const { frame, locations, t } = this.props
    const locationElements = locations.map((location, index) => {
      const mimeType = Object.keys(location)[0]
      const url = location[mimeType]
      const activeFrame = frame === index

      return (
        <StyledFrame
          key={`${url}-${index}`}
          ref={activeFrame ? this.activeLabel : null}
        >
          <input
            checked={activeFrame}
            name='frame'
            onChange={() => this.handleFrameChange(index)}
            type='radio'
          />
          <StyledMedia
            alt={t('SubjectViewer.MultiFrameViewer.FrameCarousel.thumbnailAltText')}
            background='accent-1'
            fit='cover'
            height={40}
            placeholder={
              <More
                color='neutral-6'
                size='medium'
              />}
            src={url}
            width={40}
          />
        </StyledFrame>
      )
    })

    return (
      <Box
        background={{ dark: 'dark-3', light: 'neutral-6' }}
        direction='column'
        height={{ max: '450px' }}
        width='4em'
      >
        <StyledControlButton
          disabled={frame === 0}
          fill='horizontal'
          label={<PreviousLabel />}
          onClick={() => this.handlePrevious()}
        />
        <StyledFrameList
          ref={this.frameList}
        >
          {locationElements}
        </StyledFrameList>
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

const ThemedFrameCarousel = withTheme(FrameCarousel)
export default withTranslation('components')(ThemedFrameCarousel)
export { FrameCarousel }
