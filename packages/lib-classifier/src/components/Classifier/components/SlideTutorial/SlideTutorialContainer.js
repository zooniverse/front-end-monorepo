import React from 'react'
import PropTypes from 'prop-types'
import { Box, Paragraph, ResponsiveContext } from 'grommet'
import { withStores } from '@helpers'
import { useTranslation } from 'react-i18next'

import SlideTutorial from './SlideTutorial'

function storeMapper (classifierStore) {
  const {
    activeStep,
    isFirstStep,
    isLastStep,
    stepWithMedium
  } = classifierStore.tutorials

  const { active: project } = classifierStore.projects

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
  projectDisplayName = '',
  pad = 'medium',
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
            <SlideTutorial height={height} {...props} />
          )
        }}
      </ResponsiveContext.Consumer>
    )
  }

  return (
    <Box
      height='100%'
      justify='between'
      {...props}
    >
      <Paragraph>{t('SlideTutorial.error')}</Paragraph>
    </Box>
  )
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

export default withStores(SlideTutorialContainer, storeMapper)
