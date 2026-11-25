import { useContext, useEffect, useState } from 'react'
import { bool, object } from 'prop-types'

import { ResponsiveContext } from 'grommet'
import { Modal } from '@zooniverse/react-components'
import { useTranslation } from '@translations/i18n'
import { withStores } from '@helpers'
import SlideTutorial from '../SlideTutorial'

function storeMapper(classifierStore) {
  const { active: tutorial } = classifierStore.tutorials

  const hasNotSeenTutorialBefore = tutorial?.hasNotBeenSeen

  return {
    hasNotSeenTutorialBefore,
    tutorial
  }
}

function ModalTutorial({ hasNotSeenTutorialBefore = false, tutorial }) {
  const [active, setActive] = useState(false)
  const size = useContext(ResponsiveContext)
  const { t } = useTranslation('components')

  useEffect(() => {
    if (hasNotSeenTutorialBefore) {
      setActive(true)
    }
  }, [hasNotSeenTutorialBefore])

  function onClose() {
    setActive(false)
    tutorial.setSeenTime()
  }

  const width = size === 'small' ? '100%' : '460px'
  // Account for mobile browser nav bars and the "notch"
  // Must override Modal's default height of 100vh
  const maxHeight = size === 'small' ? '70%' : '100%'

  if (tutorial) {
    return (
      <Modal
        active={active}
        closeFn={onClose}
        height={{ max: maxHeight }}
        width={{ max: width, width: width, min: width }}
        pad='none'
        title={t('ModalTutorial.title')}
      >
        <SlideTutorial onComplete={onClose} />
      </Modal>
    )
  }

  return null
}

ModalTutorial.propTypes = {
  hasNotSeenTutorialBefore: bool,
  tutorial: object
}

export default withStores(ModalTutorial, storeMapper)
export { ModalTutorial }
