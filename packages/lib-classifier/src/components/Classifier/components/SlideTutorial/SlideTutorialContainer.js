import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveContext } from 'grommet'
import { useTranslation } from 'react-i18next'

import { withStores } from '@helpers'
import SlideTutorial from './SlideTutorial'

function storeMapper(classifierStore) {
  const {
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
    projectDisplayName: project.display_name,
    steps,
    stepWithMedium
  }
}

function SlideTutorialContainer({
  activeStep = 0,
  pad = 'medium',
  projectDisplayName = '',
  steps = [],
  stepWithMedium,
  ...props
}) {
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
            {...props}
          />
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

SlideTutorialContainer.propTypes = {
  activeStep: PropTypes.number,
  projectDisplayName: PropTypes.string,
  steps: PropTypes.array,
  stepWithMedium: PropTypes.func.isRequired
}

export default withStores(SlideTutorialContainer, storeMapper)
export { SlideTutorialContainer }
