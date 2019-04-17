import { Box, ResponsiveContext } from 'grommet'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { withTheme } from 'styled-components'

import FieldGuideItems from './components/FieldGuideItems'
import FieldGuideItem from './components/FieldGuideItem'

function storeMapper (stores) {
  const { active: fieldGuide, activeItemIndex } = stores.classifierStore.fieldGuide
  return {
    activeItemIndex,
    items: fieldGuide.items
  }
}

@withTheme
@inject(storeMapper)
@observer
class FieldGuide extends React.Component {
  render () {
    const { activeItemIndex, className, items } = this.props
    console.info(this.props.theme)
    return (
      <ResponsiveContext.Consumer>
        {size => {
          const height = (size === 'small') ? '100%' : '415px'
          const width = (size === 'small') ? '100%' : '490px'
          return (
            <Box
              background={{
                dark: 'dark-3',
                light: 'white'
              }}
              className={className}
              height={height}
              overflow='auto'
              width={width}
            >
              {items[activeItemIndex]
                ? <FieldGuideItem item={items[activeItemIndex]} />
                : <FieldGuideItems items={items} />
              }
            </Box>
          )
        }}
      </ResponsiveContext.Consumer>
    )
  }
}

FieldGuide.wrappedComponent.defaultProps = {
  activeItemIndex: -1,
  className: '',
}

FieldGuide.wrappedComponent.propTypes = {
  activeItemIndex: PropTypes.number,
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default FieldGuide
