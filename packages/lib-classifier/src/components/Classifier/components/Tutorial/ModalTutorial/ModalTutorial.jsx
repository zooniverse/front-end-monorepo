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

function ModalTutorial({ hasNotSeenTutorialBefore = false, tutorial, ...props }) {
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

  const maxWidth = size === 'small' ? '100%' : '460px'
  const maxHeight = size === 'small' ? '70vh' : '90vh' // To account for mobile browser nav bars and the "notch"

  if (tutorial) {
    return (
      <Modal
        {...props}
        active={active}
        closeFn={onClose}
        height={{ max: maxHeight }}
        width={{ max: maxWidth}}
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
