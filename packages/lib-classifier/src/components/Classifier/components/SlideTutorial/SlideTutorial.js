import counterpart from 'counterpart'
import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import styled from 'styled-components'
import { Box, Heading, Paragraph, ResponsiveContext } from 'grommet'
import { Markdownz, Media } from '@zooniverse/react-components'
import StepNavigation from './components/StepNavigation'
import en from './locales/en'

counterpart.registerTranslations('en', en)

function storeMapper (stores) {
  const { activeStep, stepWithMedium } = stores.classifierStore.tutorials
  const { active: project } = stores.classifierStore.projects
  return {
    activeStep,
    projectDisplayName: project.display_name,
    stepWithMedium
  }
}

const StyledMarkdownWrapper = styled(Box)`
  > hr {
    width: 100%; /* Why is this needed? */
  }

  > h1, h2 {
    font-size: 26px;
    line-height: 31px;
  }

  > p {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`

// TODO: Split into container and view components so that view can be exported for external use
// Media need to be updated on panoptes to have a description for use as alt text
@inject(storeMapper)
@observer
class SlideTutorial extends React.Component {
  render () {
    const { activeStep, projectDisplayName, stepWithMedium } = this.props
    if (stepWithMedium && Object.keys(stepWithMedium).length > 0) {
      const { medium, step } = stepWithMedium
      const isThereMedia = medium && medium.src
      return (
        <ResponsiveContext.Consumer>
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
              <Heading level='3' margin='20px 0 10px 0'>{counterpart('SlideTutorial.heading', { projectDisplayName })}</Heading>
              <StyledMarkdownWrapper aria-live='polite' autoFocus height='100%' overflow='auto'>
                {/* TODO: translation */}
                <Markdownz>{step.content}</Markdownz>
              </StyledMarkdownWrapper>
              <StepNavigation />
            </Box>
          )}
        }
        </ResponsiveContext.Consumer>
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
  projectDisplayName: '',
  pad: "medium"
}

SlideTutorial.wrappedComponent.propTypes = {
  activeStep: PropTypes.number,
  projectDisplayName: PropTypes.string,
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
