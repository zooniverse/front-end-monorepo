import { Button, Text } from 'grommet'
import styled from 'styled-components'

// to be used with Add a Tag, comments' Newest/Oldest First, and (eventually) Classify this Subject

const StyledButton = styled(Button)`
  &:focus,
  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    cursor: not-allowed;
    text-decoration: none;
  }
`

const StyledLabel = styled(Text)`
  letter-spacing: 0.8px;
  text-transform: uppercase;
`

const DEFAULT_HANDLER = () => true

function PlainButton({
  icon,
  onClick = DEFAULT_HANDLER,
  text = '',
  ...props
}) {
  return (
    <StyledButton
      gap='xsmall'
      icon={icon}
      label={
        <StyledLabel
          color={{ dark: 'accent-1', light: 'neutral-1' }}
          size='1rem'
          weight={500}
        >
          {text}
        </StyledLabel>
      }
      plain
      onClick={onClick}
      {...props}
    />
  )
}

export default PlainButton
