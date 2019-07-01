import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import SpacedText from '../../../../../SpacedText'

const StyledNavButton = styled(Button)`
  border-bottom: 2px solid transparent;
  white-space: nowrap;

  &:hover, &:focus {
    border-bottom-color: ${zooTheme.global.colors.brand};
  }

  &:first-of-type {
    margin-right: 24px
  }
`

export default function NavButton ({ label, onClick }) {
  return (
    <StyledNavButton
      label={<SpacedText color="#B2B2B2" weight="bold" size="xsmall">{label}</SpacedText>}
      plain={true}
      onClick={onClick}
    />
  )
}

NavButton.defaultProps = {
  label: ''
}

NavButton.propTypes = {
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  onClick: PropTypes.func.isRequired
}