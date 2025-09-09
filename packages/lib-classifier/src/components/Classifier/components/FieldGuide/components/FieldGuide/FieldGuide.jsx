import { Box } from 'grommet'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { observable } from 'mobx'
import { PropTypes as MobXPropTypes } from 'mobx-react'
import styled from 'styled-components'

import FieldGuideItems from './components/FieldGuideItems'
import FieldGuideItem from './components/FieldGuideItem'

// ModalComponent has min-height, but content should have auto min-height because its flexbox
const AutoMinHeight = styled(Box)`
  min-height: auto;
`

const defaultIcons = observable.map()
function FieldGuide ({
  className = '',
  fieldGuide,
  icons = defaultIcons,
  modalComponent,
  modalProps,
  strings = {}
}) {
  const [activeItemIndex, setActiveItemIndex] = useState(-1)
  const items = fieldGuide?.items || []
  const item = items[activeItemIndex]
  const title = strings[`items.${activeItemIndex}.title`]
  const content = strings[`items.${activeItemIndex}.content`]
  const ModalComponent = modalComponent
  const id = activeItemIndex ? `field-guide-item-${activeItemIndex}` : 'field-guide-menu'
  return (
    <ModalComponent {...modalProps}>
      <AutoMinHeight className={className} pad={{ left: 'medium', right: 'medium', bottom: 'medium', top: '0' }}>
        {item
          ? <FieldGuideItem id={id} icons={icons} item={item} setActiveItemIndex={setActiveItemIndex} content={content} title={title} />
          : <FieldGuideItems id={id} icons={icons} items={items} onChange={setActiveItemIndex} strings={strings} />
        }
      </AutoMinHeight>
    </ModalComponent>
  )
}

FieldGuide.propTypes = {
  activeItemIndex: PropTypes.number,
  className: PropTypes.string,
  fieldGuide: PropTypes.object.isRequired,
  icons: MobXPropTypes.observableMap,
  modalComponent: PropTypes.object.isRequired,
  modalProps: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  size: PropTypes.string,
  strings: PropTypes.object
}

export default FieldGuide
