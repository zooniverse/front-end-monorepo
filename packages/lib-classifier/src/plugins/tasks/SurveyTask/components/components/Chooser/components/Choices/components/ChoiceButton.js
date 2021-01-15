import {
  Button,
  Text
} from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

const StyledChoiceButton = styled(Button)`
  ${props => props.theme.dark
    ? css`background-color: ${props.theme.global.colors['dark-5']};`
    : css`background-color: ${props.theme.global.colors['neutral-6']};`}
  border: none;
  border-radius: 0px;
  padding: 5px;
  text-align: start; 
`

export default function ChoiceButton (props) {
  const {
    choiceId,
    choiceLabel,
    onChoose
  } = props

  return (
    <StyledChoiceButton
      label={
        <Text
          color={{
            dark: 'neutral-6',
            light: 'dark-1'
          }}
        >
          {choiceLabel}
        </Text>
      }
      onClick={() => onChoose(choiceId)}
      size='small'
    />
  )
}

ChoiceButton.defaultProps = {
  choiceId: '',
  choiceLabel: '',
  onChoose: () => {}
}

ChoiceButton.propTypes = {
  choiceId: PropTypes.string,
  choiceLabel: PropTypes.string,
  onChoose: PropTypes.func
}
