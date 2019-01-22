import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as MobXPropTypes } from 'mobx-react'


function storeMapper(stores) {
  const { active: tutorial, activeStep, setTutorialStep } = stores.classifierStore.tutorials
  return {
    activeStep,
    setTutorialStep,
    steps: tutorial.steps
  }
}

@inject(storeMapper)
@observer
