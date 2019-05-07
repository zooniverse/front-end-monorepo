import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import { PlainButton } from '@zooniverse/react-components'

export const StyledPlainButton = styled(PlainButton)`
  > div {
    justify-content: flex-start;
  }
`

function MetaToolsButton (props) {
  const { disabled, icon, onClick, text } = props

  return (
    <StyledPlainButton
      disabled={disabled}
      icon={icon}
      text={text}
      onClick={onClick}
      {...props}
    />
  )
}

MetaToolsButton.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  onClick: PropTypes.func,
  text: PropTypes.string,
  theme: PropTypes.shape({
    dark: PropTypes.bool
  })
}

MetaToolsButton.defaultProps = {
  disabled: false,
  icon: null,
  onClick: () => false,
  text: '',
  theme: {
    dark: false
  }
}

export default withTheme(MetaToolsButton)
export { MetaToolsButton }
