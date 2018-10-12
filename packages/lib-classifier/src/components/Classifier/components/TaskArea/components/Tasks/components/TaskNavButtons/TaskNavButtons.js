import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box } from 'grommet'
import NextButton from './components/NextButton'
import DoneButton from './components/DoneButton'
import BackButton from './components/BackButton'

export const ButtonsWrapper = styled.span`
  display: flex;
  width: 100%;
  
  > a:first-of-type, > div:first-of-type, > span:first-of-type {
    margin-right: 1ch;
  }
`

export default function TaskNavButtons (props) {
  if (props.showNextButton) {
    return (
      <Box pad='small'>
        {props.showBackButton &&
          <BackButton
            areAnnotationsNotPersisted={props.areAnnotationsNotPersisted}
            onClick={props.destroyCurrentAnnotation}
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
    <Box pad='small'>
      {props.showBackButton &&
        <BackButton
          areAnnotationsNotPersisted={props.areAnnotationsNotPersisted}
          onClick={props.destroyCurrentAnnotation}
        />}
      <DoneButton
        completed={props.completed}
        demoMode={props.demoMode}
        // goldStandardMode={props.classification ? props.classification.gold_standard : false}
        onClick={props.completeClassification}
        disabled={props.waitingForAnswer}
      />
    </Box>
  )
}

TaskNavButtons.defaultProps = {
  areAnnotationsNotPersisted: false,
  autoFocus: false,
  completeClassification: () => {},
  completed: false,
  demoMode: false,
  destroyCurrentAnnotation: () => {},
  nextSubject: () => {},
  showBackButton: false,
  showNextButton: false,
  showDoneAndTalkLink: false,
  waitingForAnswer: false
}

TaskNavButtons.propTypes = {
  areAnnotationsNotPersisted: PropTypes.bool,
  autoFocus: PropTypes.bool,
  completeClassification: PropTypes.func,
  completed: PropTypes.bool,
  demoMode: PropTypes.bool,
  destroyCurrentAnnotation: PropTypes.func,
  nextSubject: PropTypes.func,
  showBackButton: PropTypes.bool,
  showNextButton: PropTypes.bool,
  showDoneAndTalkLink: PropTypes.bool,
  waitingForAnswer: PropTypes.bool
}
