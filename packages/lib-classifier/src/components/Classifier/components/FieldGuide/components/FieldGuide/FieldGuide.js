import { Box } from 'grommet'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import FieldGuideItems from './components/FieldGuideItems'
import FieldGuideItem from './components/FieldGuideItem'

const StyledBox = styled(Box)`
  max-height: 415px;
  max-width: 480px;
  overflow: auto;
`


function storeMapper(stores) {
  const { active: fieldGuide, activeItem } = stores.classifierStore.fieldGuide
  return {
    activeItem,
    items: fieldGuide.items
  }
}

@inject(storeMapper)
@observer
class FieldGuide extends React.Component {
  render () {
    const { activeItem, className, items } = this.props
    return (
      <StyledBox className={className}>
        {items[activeItem] ?
          <FieldGuideItem item={items[activeItem]} /> :
          <FieldGuideItems items={items} />}
      </StyledBox>
    )
  }
}

FieldGuide.wrappedComponent.defaultProps = {
  activeItem: null,
  className: '',
}

FieldGuide.wrappedComponent.propTypes = {
  activeItem: PropTypes.object,
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default FieldGuide