import { Box } from 'grommet'
import PropTypes from 'prop-types'
import { useState } from 'react';
import { observable } from 'mobx'
import { PropTypes as MobXPropTypes } from 'mobx-react'

import FieldGuideItems from './components/FieldGuideItems'
import FieldGuideItem from './components/FieldGuideItem'

const defaultIcons = observable.map()
function FieldGuide ({
  boxHeight = '415px',
  boxWidth = '490px',
  className = '',
  fieldGuide,
  icons = defaultIcons,
  modalComponent,
  modalProps,
  strings={}
}) {
  const [activeItemIndex, setActiveItemIndex] = useState(-1)
  const items = fieldGuide?.items || []
  const item = items[activeItemIndex]
  const title = strings[`items.${activeItemIndex}.title`]
  const content = strings[`items.${activeItemIndex}.content`]
  const ModalComponent = modalComponent
  const id = activeItemIndex ? `field-guide-item-${activeItemIndex}` : 'field-guide-menu'
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
          ? <FieldGuideItem id={id} icons={icons} item={item} setActiveItemIndex={setActiveItemIndex} content={content} title={title} />
          : <FieldGuideItems id={id} icons={icons} items={items} onChange={setActiveItemIndex} strings={strings} />
        }
      </Box>
    </ModalComponent>
  )
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
  setActiveItemIndex: PropTypes.func,
  strings: PropTypes.object
}

export default FieldGuide
