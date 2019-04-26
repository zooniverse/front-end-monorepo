import counterpart from 'counterpart'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Button, Heading } from 'grommet'
import { Markdownz, Media } from '@zooniverse/react-components'
import StepNavigation from './components/StepNavigation'
import en from './locales/en'

counterpart.registerTranslations('en', en)

const StyledMarkdownWrapper = styled(Box)`
  > h1, h2 {
    font-size: 26px;
    line-height: 31px;
  }

  > p {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`

function SlideTutorial (props) {
  const {
    activeStep,
    className,
    isFirstStep,
    isLastStep,
    projectDisplayName,
    onClick,
    height,
    pad,
    stepWithMedium,
    width
  } = props
  const { medium, step } = stepWithMedium
  const isThereMedia = medium && medium.src
  return (
    <Box
      className={className}
      height={height}
      justify='between'
      pad={pad}
      width={width}
    >
      <StyledMarkdownWrapper
        aria-live='polite'
        autoFocus
        height='100%'
        overflow={{ horizontal: 'hidden', vertical: 'auto' }}
      >
        {isThereMedia &&
          <Media
            alt={counterpart('SlideTutorial.alt', { activeStep })}
            fit='cover'
            height={200}
            src={medium.src}
          />}
        {isFirstStep &&
          <Heading level='3' margin={{ bottom: 'xsmall', top: 'small' }}>
            {counterpart('SlideTutorial.heading', { projectDisplayName })}
          </Heading>}
        {/* TODO: translation */}
        <Markdownz>{step.content}</Markdownz>
      </StyledMarkdownWrapper>
      <StepNavigation />
      {isLastStep &&
        <Button
          label={counterpart('SlideTutorial.getStarted')}
          onClick={onClick}
          margin={{ top: 'medium' }}
          primary
        />}
    </Box>
  )
}

SlideTutorial.defaultProps = {
  activeStep: 0,
  className: '',
  isFirstStep: true,
  isLastStep: false,
  onClick: () => {},
  projectDisplayName: '',
  pad: 'medium'
}

SlideTutorial.propTypes = {
  activeStep: PropTypes.number,
  className: PropTypes.string,
  isFirstStep: PropTypes.bool,
  isLastStep: PropTypes.bool,
  projectDisplayName: PropTypes.string,
  onClick: PropTypes.func,
  stepWithMedium: PropTypes.shape({
    medium: PropTypes.shape({
      content_type: PropTypes.string,
      external_link: PropTypes.bool,
      href: PropTypes.string,
      id: PropTypes.string,
      media_type: PropTypes.string,
      metadata: PropTypes.object,
      src: PropTypes.string
    }),
    step: PropTypes.shape({
      content: PropTypes.string.isRequired,
      medium: PropTypes.string
    })
  }).isRequired
}

export default SlideTutorial
