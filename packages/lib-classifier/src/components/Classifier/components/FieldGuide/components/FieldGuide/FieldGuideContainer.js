import PropTypes from 'prop-types'
import React from 'react'
import { MovableModal, Modal } from '@zooniverse/react-components'
import FieldGuide from './FieldGuide'
import { useTranslation } from 'react-i18next'

function FieldGuideContainer (props) {
  const {
    onClose,
    size,
    ...rest
  } = props
  const { t } = useTranslation('components')

  const modalComponent = (size === 'small') ? Modal : MovableModal
  const minHeight = 415
  const minWidth = 490

  const [height, setHeight] = React.useState(minHeight)

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
    minHeight,
    minWidth,
    onResize,
    position: {
      height,
      x: 0 - (minWidth + 60), // width plus margins
      y: 0 - (minHeight + 60) * 0.5 // centers vertically
    }
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

FieldGuideContainer.defaultProps = {
  className: '',
  onClose: () => { },
  setActiveItemIndex: () => { },
  size: 'large'
}

FieldGuideContainer.propTypes = {
  className: PropTypes.string,
  fieldGuide: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  setActiveItemIndex: PropTypes.func,
  size: PropTypes.string
}

export default FieldGuideContainer
