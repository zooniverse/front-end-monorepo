import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box } from 'grommet'
import NextButton from './components/NextButton'
import DoneButton from './components/DoneButton'
import DoneAndTalkButton from './components/DoneAndTalkButton'
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
      {props.showDoneAndTalkLink &&
        <DoneAndTalkButton
          completed={props.completed}
          demoMode={props.demoMode}
          flex='grow'
          goldStandardMode={props.classification ? props.classification.goldStandard : false}
          onClick={props.completeClassification}
          disabled={props.waitingForAnswer}
          projectSlug={props.projectSlug}
          subjectId={props.subjectId}
        />}
      <DoneButton
        completed={props.completed}
        demoMode={props.demoMode}
        flex='grow'
        goldStandardMode={props.classification ? props.classification.goldStandard : false}
        onClick={props.onSubmit}
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
  onSubmit: () => {},
  nextSubject: () => {},
  projectSlug: '',
  showBackButton: false,
  showNextButton: false,
  showDoneAndTalkLink: false,
  subjectId: '',
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
  onSubmit: PropTypes.func,
  projectSlug: PropTypes.string,
  showBackButton: PropTypes.bool,
  showNextButton: PropTypes.bool,
  showDoneAndTalkLink: PropTypes.bool,
  subjectId: PropTypes.string,
  completeClassification: PropTypes.func,
  waitingForAnswer: PropTypes.bool
}
