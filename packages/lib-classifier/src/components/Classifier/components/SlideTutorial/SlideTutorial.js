import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import styled from 'styled-components'
import { Box, Image, Paragraph } from 'grommet'
import { Markdownz } from '@zooniverse/react-components'
import StepNavigation from './components/StepNavigation'

function storeMapper(stores) {
  const { stepWithMedium } = stores.classifierStore.tutorials
  return {
    stepWithMedium
  }
}

@inject(storeMapper)
@observer
class SlideTutorial extends React.Component {
  render() {
    const { stepWithMedium } = this.props
    if (!stepWithMedium) return <Box><Paragraph>Tutorial step could not be loaded.</Paragraph></Box>

    const { medium, step } = stepWithMedium
    return (
      <Box
        pad='medium'
      >
        {medium && medium.src &&
          <Image alt='' src={medium.src} />}
        <Markdownz>{step.content}</Markdownz>
        <StepNavigation />
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
      content: PropTypes.string,
      medium: PropTypes.string
    })
  }).isRequired
}

export default SlideTutorial