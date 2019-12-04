import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'

import NextButton from './components/NextButton'
import DoneButton from './components/DoneButton'
import DoneAndTalkButton from './components/DoneAndTalkButton'
import BackButton from './components/BackButton'

export default function TaskNavButtons (props) {
  const goldStandardMode = props.classification ? props.classification.goldStandard : false
  const disabled = props.disabled

  if (props.showNextButton) {
    return (
      <Box direction='row' gap='xsmall'>
        {props.showBackButton &&
          <BackButton
            areAnnotationsNotPersisted={props.areAnnotationsNotPersisted}
            onClick={props.goToPreviousStep}
          />}
        <NextButton
          autoFocus={false}
          onClick={props.goToNextStep}
          disabled={disabled}
        />
      </Box>
    )
  }

  // Shown on summary enabled workflows.
  if (props.completed) {
    return (
      <Box>
        <NextButton
          autoFocus={props.autoFocus}
          disabled={false}
          onClick={props.nextSubject}
        />
      </Box>
    )
  }

  return (
    <Box direction='row' gap='xsmall'>
      {props.showBackButton &&
        <BackButton
          areAnnotationsNotPersisted={props.areAnnotationsNotPersisted}
          onClick={props.goToPreviousStep}
        />}
      <DoneAndTalkButton
        completed={props.completed}
        demoMode={props.demoMode}
        flex='grow'
        goldStandardMode={goldStandardMode}
        onClick={props.onSubmit}
        disabled={disabled}
      />
      <DoneButton
        completed={props.completed}
        demoMode={props.demoMode}
        flex='grow'
        goldStandardMode={goldStandardMode}
        onClick={props.onSubmit}
        disabled={disabled}
      />
    </Box>
  )
}

TaskNavButtons.defaultProps = {
  areAnnotationsNotPersisted: false,
  autoFocus: false,
  completed: false,
  demoMode: false,
  disabled: false,
  goToPreviousStep: () => {},
  onSubmit: () => {},
  nextSubject: () => {},
  showBackButton: false,
  showNextButton: false,
  showDoneAndTalkLink: false
}

TaskNavButtons.propTypes = {
  areAnnotationsNotPersisted: PropTypes.bool,
  autoFocus: PropTypes.bool,
  completed: PropTypes.bool,
  demoMode: PropTypes.bool,
  disabled: PropTypes.bool,
  goToPreviousStep: PropTypes.func,
  nextSubject: PropTypes.func,
  onSubmit: PropTypes.func,
  showBackButton: PropTypes.bool,
  showNextButton: PropTypes.bool
}
