import { arrayOf, node, object, oneOfType, string } from 'prop-types'
import { Menu } from 'grommet'
import styled from 'styled-components'

const StyledMenu = styled(Menu)`
  & > div {
    padding: 0;
  }
`

export default function NarrowMenu({
  children,
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
    <StyledMenu
      aria-label={ariaLabel}
      dropAlign={{ top: 'bottom', right: 'right' }}
      dropBackground={dropBackground}
      icon={icon}
      items={items}
      label={label}
      size={size}
      {...props}
    >
      {children}
    </StyledMenu>
  )
}

NarrowMenu.propTypes = {
  dropBackground: string,
  icon: node,
  items: arrayOf(object).isRequired,
  label: oneOfType([node, string]),
  size: string
}
