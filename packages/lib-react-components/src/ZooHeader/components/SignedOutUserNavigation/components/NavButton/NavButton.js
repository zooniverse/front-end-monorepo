import React from 'react'
import PropTypes from 'prop-types'
import styled, { css, withTheme } from 'styled-components'
import { Button } from 'grommet'
import SpacedText from '../../../../../SpacedText/index.js'

const StyledNavButton = styled(Button)`
  border-bottom: 2px solid transparent;
  white-space: nowrap;

  &:hover, &:focus {
    ${props => css`border-bottom-color: ${props.theme.global.colors.brand};`}
  }

  &:first-of-type {
    margin-right: 24px
  }
`

function NavButton ({ label, onClick, theme }) {
  return (
    <StyledNavButton
      label={<SpacedText color="#B2B2B2" weight="bold" size="xsmall">{label}</SpacedText>}
      plain={true}
      onClick={onClick}
      theme={theme}
    />
  )
}

NavButton.defaultProps = {
  label: '',
  theme: {
    global: {
      colors: {}
    }
  }
}

NavButton.propTypes = {
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  onClick: PropTypes.func.isRequired,
  theme: PropTypes.object
}

export default withTheme(NavButton)
export { NavButton }