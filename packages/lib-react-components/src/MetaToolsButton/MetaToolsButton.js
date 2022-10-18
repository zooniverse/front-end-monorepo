import PropTypes from 'prop-types'
import React from 'react'
import styled, { css, withTheme } from 'styled-components'
import PlainButton from '../PlainButton/index.js'

export const StyledPlainButton = styled(PlainButton)`
  > div {
    justify-content: flex-start;
    ${props => css`padding: ${props.padding};`}
    ${props => css`line-height: ${props.theme.paragraph.small.height};`}
  }

  span {
    ${props => props.active && css`font-weight: bold;`}
  }
`

function MetaToolsButton (props) {
  const { disabled, icon, onClick, text } = props

  return (
    <StyledPlainButton
      disabled={disabled}
      icon={icon}
      labelSize='small'
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
    dark: PropTypes.bool,
    paragraph: PropTypes.object
  })
}

MetaToolsButton.defaultProps = {
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
