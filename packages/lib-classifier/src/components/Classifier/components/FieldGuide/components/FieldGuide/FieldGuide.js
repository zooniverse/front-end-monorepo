import { Box, ResponsiveContext } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import { observable } from 'mobx'
import { PropTypes as MobXPropTypes } from 'mobx-react'
import { MovableModal, Modal } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import en from './locales/en'

import FieldGuideItems from './components/FieldGuideItems'
import FieldGuideItem from './components/FieldGuideItem'

counterpart.registerTranslations('en', en)

function FieldGuide (props) {
  const {
    activeItemIndex,
    className,
    fieldGuide,
    icons,
    setActiveItemIndex,
    onClose
  } = props
  const items = fieldGuide?.items || []
  const item = items[activeItemIndex]
  return (
    <ResponsiveContext.Consumer>
      {size => {
        const minHeight = 415
        const minWidth = 490
        const height = (size === 'small') ? '100%' : `${minHeight}px`
        const width = (size === 'small') ? '100%' : `${minWidth}px`
        const ModalWrapper = (size === 'small') ? Modal : MovableModal
        const modalProps = {
          active: true,
          closeFn: onClose,
          modal: false,
          pad: 'medium',
          position: 'right',
          title: counterpart('FieldGuide.title')
        }
        const rndProps = {
          minHeight,
          minWidth,
          position: {
            x: 0 - (minWidth + 60), // width plus margins
            y: 0 - (minHeight + 60) * 0.5 // centers vertically
          }
        }
        const modalPropsToUse = (size === 'small') ? modalProps : Object.assign({}, modalProps, { rndProps })
        return (
          <ModalWrapper
            {...modalPropsToUse}
          >
            <Box
              className={className}
              height={{ min: height }}
              width={{ min: width }}
            >
              {item
                ? <FieldGuideItem icons={icons} item={item} setActiveItemIndex={setActiveItemIndex} />
                : <FieldGuideItems icons={icons} items={items} setActiveItemIndex={setActiveItemIndex} />
              }
            </Box>
          </ModalWrapper>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

FieldGuide.defaultProps = {
  activeItemIndex: -1,
  className: '',
  icons: observable.map(),
  onClose: () => {},
  setActiveItemIndex: () => {}
}

FieldGuide.propTypes = {
  activeItemIndex: PropTypes.number,
  className: PropTypes.string,
  fieldGuide: PropTypes.object.isRequired,
  icons: MobXPropTypes.observableMap,
  onClose: PropTypes.func,
  setActiveItemIndex: PropTypes.func
}

export default FieldGuide
