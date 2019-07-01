import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import { PlainButton } from '@zooniverse/react-components'

export const StyledPlainButton = styled(PlainButton)`
  > div {
    justify-content: flex-start;
    line-height: ${(props) => props.theme.paragraph.small.height};
  }
`

function MetaToolsButton (props) {
  const { className, disabled, icon, onClick, text } = props

  return (
    <StyledPlainButton
      className={className}
      disabled={disabled}
      icon={icon}
      labelSize='small'
      margin='none'
      text={text}
      onClick={onClick}
      {...props}
    />
  )
}

MetaToolsButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  onClick: PropTypes.func,
  text: PropTypes.string,
  theme: PropTypes.shape({
    dark: PropTypes.bool,
    paragraph: PropTypes.object
  })
}

MetaToolsButton.defaultProps = {
  className: '',
  disabled: false,
  icon: null,
  onClick: () => false,
  text: '',
  theme: {
    dark: false,
    paragraph: {
      small: {
        height: ''
      }
    }
  }
}

export default withTheme(MetaToolsButton)
export { MetaToolsButton }
