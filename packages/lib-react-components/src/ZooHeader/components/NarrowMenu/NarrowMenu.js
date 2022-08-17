import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'grommet'

export default function NarrowMenu (props) {
  const { dropBackground, icon, items, label, size } = props

  return (
    <Menu
      dropBackground={dropBackground}
      icon={icon}
      items={items}
      label={label}
      size={size}
      {...props}
    />
  )
}

NarrowMenu.defaultProps = {
  dropBackground: 'brand',
  label: '',
  size: 'small'
}

NarrowMenu.propTypes = {
  dropBackground: PropTypes.string,
  icon: PropTypes.node.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  size: PropTypes.string
}
