import counterpart from 'counterpart'
import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'
import { Box, Paragraph, ResponsiveContext } from 'grommet'
import SlideTutorial from './SlideTutorial'

function storeMapper (stores) {
  const { activeStep, stepWithMedium } = stores.classifierStore.tutorials
  const { active: project } = stores.classifierStore.projects
  return {
    activeStep,
    projectDisplayName: project.display_name,
    stepWithMedium
  }
}

@inject(storeMapper)
@observer
class SlideTutorialContainer extends React.Component {
  render () {
    const { stepWithMedium } = this.props
    if (stepWithMedium && Object.keys(stepWithMedium).length > 0) {
      return (
        <ResponsiveContext.Consumer>
          {size => {
            const height = (size === 'small') ? '100%' : '465px'
            return (
              <SlideTutorial height={height} {...this.props} />
            )
          }
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

SlideTutorialContainer.wrappedComponent.defaultProps = {
  activeStep: 0,
  projectDisplayName: '',
  pad: 'medium'
}

SlideTutorialContainer.wrappedComponent.propTypes = {
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

export default SlideTutorialContainer
