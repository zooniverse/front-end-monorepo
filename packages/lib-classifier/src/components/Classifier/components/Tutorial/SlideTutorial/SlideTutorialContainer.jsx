import { array, func, number, shape, string} from 'prop-types'

import { withStores } from '@helpers'
import { usePanoptesTranslations } from '@hooks'
import SlideTutorial from './SlideTutorial'

function storeMapper(classifierStore) {
  const {
    locale,
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
    <SlideTutorial
      activeStep={activeStep}
      steps={steps}
      stepWithMedium={stepWithMedium}
      strings={strings}
      {...props}
    />
  )
}

SlideTutorialContainer.propTypes = {
  locale: string,
  tutorial: shape({
    activeStep: number,
    steps: array,
    stepWithMedium: func.isRequired
  })
}

export default withStores(SlideTutorialContainer, storeMapper)
export { SlideTutorialContainer }
