import { Box } from 'grommet'
import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveContext } from 'grommet'
import { inject, observer } from 'mobx-react'
import FieldGuideItems from './components/FieldGuideItems'
import FieldGuideItem from './components/FieldGuideItem'

function storeMapper(stores) {
  const { active: fieldGuide, activeItemIndex } = stores.classifierStore.fieldGuide
  return {
    activeItemIndex,
    items: fieldGuide.items
  }
}

@inject(storeMapper)
@observer
class FieldGuide extends React.Component {
  render () {
    const { activeItemIndex, className, items } = this.props
    return (
      <ResponsiveContext.Consumer>
        {size => {
          const height = (size === 'small') ? '100%' : '415px'
          const width = (size === 'small') ? '100%' : '490px'
          return (
            <Box className={className} height={height} overflow='auto' width={width}>
              {items[activeItemIndex] ?
                <FieldGuideItem item={items[activeItemIndex]} /> :
                <FieldGuideItems items={items} />}
            </Box>)}}
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