import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'grommet'
import styled from 'styled-components'
import zooTheme from '@zooniverse/grommet-theme'

export const StyledMenu = styled(Menu)`
  > div:first-child {
    padding-left: 0;
    padding-right: 24px;
  }
`

export default function NarrowMenu (props) {
  const { dropBackground, icon, items, label, size } = props

  return (
    <StyledMenu
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
  dropBackground: zooTheme.global.colors.teal,
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