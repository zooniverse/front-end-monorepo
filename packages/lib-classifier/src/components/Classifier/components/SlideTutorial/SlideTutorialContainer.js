import React from 'react'
import PropTypes from 'prop-types'
import { Box, Paragraph, ResponsiveContext } from 'grommet'
import { useTranslation } from 'react-i18next'

import { withStores } from '@helpers'
import SlideTutorial from './SlideTutorial'

function storeMapper(classifierStore) {
  const {
    projects: {
      active: project
    },
    tutorials: {
      activeStep,
      isFirstStep,
      isLastStep,
      stepWithMedium
    }
  }

  return {
    activeStep,
    isFirstStep,
    isLastStep,
    projectDisplayName: project.display_name,
    stepWithMedium
  }
}

function SlideTutorialContainer({
  activeStep = 0,
  pad = 'medium',
  projectDisplayName = '',
  stepWithMedium,
  ...props
}) {
  const { t } = useTranslation('components')

  if (stepWithMedium && Object.keys(stepWithMedium).length > 0) {
    return (
      <ResponsiveContext.Consumer>
        {size => {
          const height = (size === 'small') ? '100%' : '53vh'
          return (
            <SlideTutorial
              activeStep={activeStep}
              height={height}
              pad={pad}
              projectDisplayName={projectDisplayName}
              stepWithMedium={stepWithMedium}
              {...props}
            />
          )
        }}
      </ResponsiveContext.Consumer>
    )
  }

  return (
    <Box height='100%' justify='between' pad={pad}>
      <Paragraph>{t('SlideTutorial.error')}</Paragraph>
    </Box>
  )
}

SlideTutorialContainer.propTypes = {
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

export default withStores(SlideTutorialContainer, storeMapper)
export { SlideTutorialContainer }
