import {
  Button
} from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledChoiceButton = styled(Button)`
  border-radius: 0px;
`

export default function ChoiceButton (props) {
  const {
    choiceId,
    choiceLabel,
    onChoose
  } = props

  return (
    <StyledChoiceButton
      label={choiceLabel}
      size='small'
      onClick={() => onChoose(choiceId)}
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
