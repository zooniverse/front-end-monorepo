import { SpacedText } from '@zooniverse/react-components'
import { Button } from 'grommet'
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
        <SpacedText
          color={{ dark: 'accent-1', light: 'neutral-1' }}
          size='1rem'
          weight={500}
        >
          {text}
        </SpacedText>
      }
      plain
      onClick={onClick}
      {...props}
    />
  )
}

export default PlainButton
