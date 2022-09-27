import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'grommet'

export default function NarrowMenu({
  dropBackground = 'brand',
  icon,
  items,
  label = '',
  size = 'small',
  ...props
}) {
  let ariaLabel
  if (label.props?.text) {
    ariaLabel = label.props.text
  }

  return (
    <Menu
      aria-label={ariaLabel}
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
  icon: PropTypes.node,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  size: PropTypes.string
}
