import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveContext } from 'grommet'

import { withStores } from '@helpers'
import { usePanoptesTranslations } from '@hooks'
import SlideTutorial from './SlideTutorial'

function storeMapper(classifierStore) {
  const {
    locale,
    projects: {
      active: project
    },
    tutorials: {
      active: tutorial,
      activeStep,
      stepWithMedium
    }
  } = classifierStore

  const steps = tutorial?.steps

  return {
    activeStep,
    locale,
    projectDisplayName: project.display_name,
    steps,
    stepWithMedium,
    tutorial
  }
}

const defaultTutorial = {
  activeStep: 0,
  steps: []
}

function SlideTutorialContainer({
  locale,
  pad = 'medium',
  projectDisplayName = '',
  tutorial = defaultTutorial,
  ...props
}) {
  const tutorialTranslation = usePanoptesTranslations({
    translated_type: 'tutorial',
    translated_id: tutorial?.id,
    language: locale
  })
  const strings = tutorialTranslation?.strings
  const { activeStep, steps, stepWithMedium } = tutorial
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
            steps={steps}
            stepWithMedium={stepWithMedium}
            strings={strings}
            {...props}
          />
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

SlideTutorialContainer.propTypes = {
  locale: PropTypes.string,
  projectDisplayName: PropTypes.string,
  tutorial: PropTypes.shape({
    activeStep: PropTypes.number,
    steps: PropTypes.array,
    stepWithMedium: PropTypes.func.isRequired
  })
}

export default withStores(SlideTutorialContainer, storeMapper)
export { SlideTutorialContainer }
