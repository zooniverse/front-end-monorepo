import PropTypes from 'prop-types'
import { useState } from 'react';
import { MovableModal, Modal } from '@zooniverse/react-components'
import FieldGuide from './FieldGuide'
import { useTranslation } from '@translations/i18n'

function FieldGuideContainer ({
  onClose = () => true,
  size = 'large',
  ...rest
}) {
  const { t } = useTranslation('components')

  const modalComponent = (size === 'small') ? Modal : MovableModal
  const minHeight = 415
  const minWidth = 490

  const [height, setHeight] = useState(minHeight)

  function onResize(e, direction, ref, delta, position) {
    if (height !== 'auto' && modalComponent === MovableModal) setHeight('auto')
  }

  const boxHeight = (size === 'small') ? '100%' : `${minHeight}px`
  const boxWidth = (size === 'small') ? '100%' : `${minWidth}px`

  const modalProps = {
    active: true,
    closeFn: onClose,
    modal: false,
    pad: 'medium',
    position: 'right',
    title: t('FieldGuide.title')
  }
  const rndProps = {
    default: {
      height,
      x: 0 - (minWidth + 60), // width plus margins
      y: 0 - (minHeight + 60) * 0.5 // centers vertically
    },
    minHeight,
    minWidth,
    onResize
  }
  const modalPropsToUse = (size === 'small') ? modalProps : Object.assign({}, modalProps, { rndProps })
  return (
    <FieldGuide
      boxHeight={boxHeight}
      boxWidth={boxWidth}
      modalComponent={modalComponent}
      modalProps={modalPropsToUse}
      {...rest}
    />
  )
}

FieldGuideContainer.propTypes = {
  onClose: PropTypes.func,
  size: PropTypes.string
}

export default FieldGuideContainer
