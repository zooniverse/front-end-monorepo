import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ResponsiveContext } from 'grommet'
import { Modal } from '@zooniverse/react-components'
import { useTranslation } from '@translations/i18n'
import { withStores } from '@helpers'
import SlideTutorial from '../SlideTutorial'

const StyledModal = styled(Modal)`
  max-height: 80vh;
`

function storeMapper (classifierStore) {
  const {
    active: tutorial
  } = classifierStore.tutorials

  const hasNotSeenTutorialBefore = tutorial?.hasNotBeenSeen

  return {
    hasNotSeenTutorialBefore,
    tutorial
  }
}

function ModalTutorial ({
  hasNotSeenTutorialBefore = false,
  tutorial,
  ...props
}) {
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

  const width = (size === 'small') ? '100%' : '400px'

  if (tutorial) {
    return (
      <StyledModal
        {...props}
        active={active}
        closeFn={onClose}
        title={t('ModalTutorial.title')}
      >
        <SlideTutorial
          onClick={onClose}
          pad='none'
          width={width}
        />
      </StyledModal>
    )
  }

  return null
}

ModalTutorial.propTypes = {
  hasNotSeenTutorialBefore: PropTypes.bool,
  tutorial: PropTypes.object
}

export default withStores(ModalTutorial, storeMapper)
export { ModalTutorial }
