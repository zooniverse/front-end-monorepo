import { Box, ResponsiveContext } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import { MovableModal } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import en from '../../locales/en'

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
        const height = (size === 'small') ? '100%' : '415px'
        const width = (size === 'small') ? '100%' : '490px'
        return (
          <MovableModal
            active
            closeFn={onClose}
            modal={false}
            pad='medium'
            plain
            position='right'
            rndProps={{
              minHeight: height,
              minWidth: width,
              position: {
                x: 0 - (490 + 60), // width plus margins
                y: 0 - (415 + 60) * 0.5 // centers vertically
              }
            }}
            title={counterpart('FieldGuide.title')}
          >
            <Box
              className={className}
              height={height}
              width={width}
            >
              {item
                ? <FieldGuideItem icons={icons} item={item} setActiveItemIndex={setActiveItemIndex} />
                : <FieldGuideItems icons={icons} items={items} setActiveItemIndex={setActiveItemIndex} />
              }
            </Box>
          </MovableModal>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

FieldGuide.defaultProps = {
  activeItemIndex: -1,
  className: '',
  onClose: () => {}
}

FieldGuide.propTypes = {
  activeItemIndex: PropTypes.number,
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func
}

export default FieldGuide
