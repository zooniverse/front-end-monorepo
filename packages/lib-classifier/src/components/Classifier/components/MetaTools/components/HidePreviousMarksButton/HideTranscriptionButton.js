import React from 'react'
import { Button } from 'grommet'
import { bool, func, object, string } from 'prop-types'
import { SpacedText } from '@zooniverse/react-components'
import styled, { css } from 'styled-components'

const StyledButton = styled(Button)`
  > div {
    justify-content: start;
    padding: 0.5em;
  }

  span {
    ${props => props.active && css`font-weight: bold;`}
  }

  &:focus,
  &:enabled:hover {
    text-decoration: underline;
  }
`

export default function HideTranscriptionButton({ checked, disabled, icon, onClick, title }) {
  return (
    <StyledButton
      active={checked}
      a11yTitle={title}
      aria-checked={checked}
      disabled={disabled}
      gap='xxsmall'
      icon={icon}
      label={
        <SpacedText color={{ dark: 'accent-2', light: 'neutral-2' }}>
          {title}
        </SpacedText>
      }
      onClick={onClick}
      pad='small'
      plain
      role='radio'
    />
  )
}

HideTranscriptionButton.propTypes = {
  checked: bool,
  disabled: bool,
  icon: object,
  onClick: func,
  title: string
}

HideTranscriptionButton.defaultProps = {
  checked: false,
  disabled: false,
  icon: null,
  onClick: () => {},
  title: ''
}
