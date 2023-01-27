import PropTypes from 'prop-types'
import { useState } from 'react'
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
  const minWidth = 550 // includes content + 60px of padding

  const [height, setHeight] = useState(minHeight)

  function onResize(e, direction, ref, delta, position) {
    if (height !== 'auto' && modalComponent === MovableModal) setHeight('auto')
  }

  const modalProps = {
    active: true,
    closeFn: onClose,
    modal: false,
    pad: '0',
    position: 'right',
    title: t('FieldGuide.title')
  }
  const rndProps = {
    default: {
      height,
      x: 0 - minWidth,
      y: 0 - (minHeight + 60) * 0.5 // centers vertically
    },
    minHeight,
    minWidth,
    onResize
  }
  const modalPropsToUse = (size === 'small') ? modalProps : Object.assign({}, modalProps, { rndProps })
  return (
    <FieldGuide
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
