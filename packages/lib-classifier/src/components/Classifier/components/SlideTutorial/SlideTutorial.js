import counterpart from 'counterpart'
import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import styled from 'styled-components'
import { Box, Paragraph } from 'grommet'
import { Markdownz, Media } from '@zooniverse/react-components'
import StepNavigation from './components/StepNavigation'
import en from './locales/en'

counterpart.registerTranslations('en', en)

function storeMapper(stores) {
  const { stepWithMedium } = stores.classifierStore.tutorials
  return {
    stepWithMedium
  }
}

const StyledMarkdownWrapper = styled(Box)`
  height: 100%;
  max-height: ${props => props.isThereMedia ? '150px' : '100%'} ;
`

// TODO: Split into container and view components so that view can be exported for external use
@inject(storeMapper)
@observer
class SlideTutorial extends React.Component {
  render() {
    const { stepWithMedium } = this.props
    if (stepWithMedium && Object.keys(stepWithMedium).length > 0) {
      const { medium, step } = stepWithMedium
      const isThereMedia = medium && medium.src
      return (
        <Box
          height="100%"
          justify='between'
          pad='medium'
        >
          {isThereMedia &&
            <Media alt='' fit='contain' height={200} src={medium.src} />}
          <StyledMarkdownWrapper autoFocus isThereMedia={isThereMedia} overflow='auto'>
            {/* TODO: translation */}
            <Markdownz>{step.content}</Markdownz>
          </StyledMarkdownWrapper>
          <StepNavigation />
        </Box>
      )
    }

    return (
      <Box
        height="100%"
        justify='between'
        pad='medium'
      >
        <Paragraph>{counterpart('SlideTutorial.error')}</Paragraph>
      </Box>
    )
  }
}

SlideTutorial.wrappedComponent.propTypes = {
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