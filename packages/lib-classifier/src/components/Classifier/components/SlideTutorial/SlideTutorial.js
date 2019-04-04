import counterpart from 'counterpart'
import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import styled from 'styled-components'
import { Box, Paragraph, ResponsiveContext } from 'grommet'
import { Markdownz, Media } from '@zooniverse/react-components'
import StepNavigation from './components/StepNavigation'
import en from './locales/en'

counterpart.registerTranslations('en', en)

function storeMapper (stores) {
  const { activeStep, stepWithMedium } = stores.classifierStore.tutorials
  return {
    activeStep,
    stepWithMedium
  }
}

const StyledMarkdownWrapper = styled(Box)`
  height: 100%;
  max-height:'100%';

  > hr {
    width: 100%; /* Why is this needed? */
  }
`

// TODO: Split into container and view components so that view can be exported for external use
// Media need to be updated on panoptes to have a description for use as alt text
@inject(storeMapper)
@observer
class SlideTutorial extends React.Component {
  render () {
    const { activeStep, stepWithMedium } = this.props
    if (stepWithMedium && Object.keys(stepWithMedium).length > 0) {
      const { medium, step } = stepWithMedium
      const isThereMedia = medium && medium.src
      return (
        <ResponsiveContext>
        {size => {
          const height = (size === 'small') ? '100%' : '465px'
          return (
            <Box
              height={height}
              justify='between'
              {...this.props}
            >
              {isThereMedia &&
                <Media
                  alt={counterpart('SlideTutorial.alt', { activeStep })}
                  fit='cover'
                  height={200}
                  src={medium.src}
                />}
              <StyledMarkdownWrapper aria-live='polite' autoFocus isThereMedia={isThereMedia} overflow='auto'>
                {/* TODO: translation */}
                <Markdownz>{step.content}</Markdownz>
              </StyledMarkdownWrapper>
              <StepNavigation />
            </Box>
          )}
        }
        </ResponsiveContext>
      )
    }

    return (
      <Box
        height='100%'
        justify='between'
        {...this.props}
      >
        <Paragraph>{counterpart('SlideTutorial.error')}</Paragraph>
      </Box>
    )
  }
}

SlideTutorial.wrappedComponent.defaultProps = {
  activeStep: 0,
  pad: "medium"
}

SlideTutorial.wrappedComponent.propTypes = {
  activeStep: PropTypes.number,
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
