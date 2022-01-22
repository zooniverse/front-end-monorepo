import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import { observable } from 'mobx'
import { PropTypes as MobXPropTypes } from 'mobx-react'

import FieldGuideItems from './components/FieldGuideItems'
import FieldGuideItem from './components/FieldGuideItem'

function FieldGuide (props) {
  const {
    activeItemIndex,
    boxHeight,
    boxWidth,
    className,
    fieldGuide,
    icons,
    modalComponent,
    modalProps,
    setActiveItemIndex,
  } = props
  console.log(modalProps)
  const items = fieldGuide?.items || []
  const item = items[activeItemIndex]
  const ModalComponent = modalComponent
  return (
    <ModalComponent
      {...modalProps}
    >
      <Box
        className={className}
        height={{ min: boxHeight }}
        width={{ min: boxWidth }}
      >
        {item
          ? <FieldGuideItem icons={icons} item={item} setActiveItemIndex={setActiveItemIndex} />
          : <FieldGuideItems icons={icons} items={items} setActiveItemIndex={setActiveItemIndex} />
        }
      </Box>
    </ModalComponent>
  )
}

FieldGuide.defaultProps = {
  activeItemIndex: -1,
  boxHeight: '415px',
  boxWidth: '490px',
  className: '',
  icons: observable.map(),
  onClose: () => {},
  size: 'large',
  setActiveItemIndex: () => {}
}

FieldGuide.propTypes = {
  activeItemIndex: PropTypes.number,
  boxHeight: PropTypes.string,
  boxWidth: PropTypes.string,
  className: PropTypes.string,
  fieldGuide: PropTypes.object.isRequired,
  icons: MobXPropTypes.observableMap,
  modalComponent: PropTypes.func.isRequired,
  modalProps: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  size: PropTypes.string,
  setActiveItemIndex: PropTypes.func
}

export default FieldGuide
