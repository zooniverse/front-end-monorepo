import { Box } from 'grommet'
import PropTypes from 'prop-types'
import { SpacedHeading } from '@zooniverse/react-components'

import InputGroup from './components/InputGroup'
import styled from 'styled-components'

const Fieldset = styled.fieldset`
  appearance: none;
  border: none;
  margin: 0;
  padding: 0;
`
export default function Questions({
  answers = {},
  hasFocus = false,
  questionIds = [],
  questions = {},
  setAnswers = () => {},
  strings
}) {
  function handleAnswer (questionAnswer, questionId) {
    const newAnswers = { ...answers, [questionId]: questionAnswer }

    // if questionAnswer is an empty string (cleared radio input) or is an empty array (cleared checkbox inputs) then questionAnswer length is 0
    if (questionAnswer.length === 0) {
      delete newAnswers[questionId]
    }

    setAnswers(newAnswers)
  }

  return (
    <Box
      flex='grow'
      gap='20px'
    >
      {questionIds.map((questionId, index) => {
        const question = questions.get(questionId) || { answers: {}, answersOrder: [] }
        const inputType = question.multiple ? 'checkbox' : 'radio'
        const options = question.answersOrder.map(answerId => ({
          label: strings.get(`questions.${questionId}.answers.${answerId}.label`),
          value: answerId
        }))

        return (
          <Fieldset
            key={questionId}
          >
            <SpacedHeading
              as='legend'
              color={{ dark: 'neutral-6', light: 'dark-5' }}
              margin={{
                top: 'none',
                bottom: '20px'
              }}
              size='1rem'
            >
              {strings.get(`questions.${questionId}.label`)}
            </SpacedHeading>
            <InputGroup
              handleAnswer={handleAnswer}
              hasFocus={hasFocus && index === 0}
              options={options}
              questionId={questionId}
              questionAnswer={answers[questionId]}
              type={inputType}
            />
          </Fieldset>
        )
      })}
    </Box>
  )
}

Questions.propTypes = {
  answers: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ])
  ),
  hasFocus: PropTypes.bool,
  questionIds: PropTypes.arrayOf(
    PropTypes.string
  ),
  questions: PropTypes.shape({
    answers: PropTypes.objectOf(
      PropTypes.shape({
        label: PropTypes.string
      })
    ),
    answersOrder: PropTypes.arrayOf(PropTypes.string),
    label: PropTypes.string,
    multiple: PropTypes.bool,
    required: PropTypes.bool
  }),
  setAnswers: PropTypes.func,
  strings: PropTypes.shape({
    get: PropTypes.func
  })
}
