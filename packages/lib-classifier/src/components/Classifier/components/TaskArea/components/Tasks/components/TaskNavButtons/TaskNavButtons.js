import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box } from 'grommet'
import NextButton from './components/NextButton'
import DoneButton from './components/DoneButton'
import BackButton from './components/BackButton'

export default function TaskNavButtons (props) {
  if (props.showNextButton) {
    return (
      <Box pad='small' direction='row'>
        {props.showBackButton &&
          <BackButton
            areAnnotationsNotPersisted={props.areAnnotationsNotPersisted}
            onClick={props.goToPreviousStep}
          />}
        <NextButton
          autoFocus={false}
          onClick={props.goToNextStep}
          disabled={props.waitingForAnswer}
        />
      </Box>
    )
  }

  // Shown on summary enabled workflows.
  if (props.completed) {
    return (
      <Box pad='small'>
        <NextButton
          autoFocus={props.autoFocus}
          disabled={false}
          onClick={props.nextSubject}
        />
      </Box>
    )
  }

  return (
    <Box direction='row' pad='small'>
      {props.showBackButton &&
        <BackButton
          areAnnotationsNotPersisted={props.areAnnotationsNotPersisted}
          onClick={props.goToPreviousStep}
        />}
      <DoneButton
        completed={props.completed}
        demoMode={props.demoMode}
        flex='grow'
        goldStandardMode={props.classification ? props.classification.goldStandard : false}
        onClick={props.completeClassification}
        disabled={props.waitingForAnswer}
      />
    </Box>
  )
}

TaskNavButtons.defaultProps = {
  areAnnotationsNotPersisted: false,
  autoFocus: false,
  completed: false,
  demoMode: false,
  goToPreviousStep: () => {},
  nextSubject: () => {},
  showBackButton: false,
  showNextButton: false,
  showDoneAndTalkLink: false,
  completeClassification: () => {},
  waitingForAnswer: false
}

TaskNavButtons.propTypes = {
  areAnnotationsNotPersisted: PropTypes.bool,
  autoFocus: PropTypes.bool,
  completed: PropTypes.bool,
  demoMode: PropTypes.bool,
  goToPreviousStep: PropTypes.func,
  nextSubject: PropTypes.func,
  showBackButton: PropTypes.bool,
  showNextButton: PropTypes.bool,
  showDoneAndTalkLink: PropTypes.bool,
  completeClassification: PropTypes.func,
  waitingForAnswer: PropTypes.bool
}
