import { Box } from 'grommet'
import PropTypes from 'prop-types'

import QuestionInput from './components/QuestionInput'

export default function InputGroup (props) {
  const {
    handleAnswer,
    hasFocus,
    options,
    questionAnswer,
    questionId,
    type
  } = props

  function handleCheckBoxChange (value, checked) {
    const newQuestionAnswer = Array.from(questionAnswer)

    if (checked) {
      newQuestionAnswer.push(value)
    } else {
      newQuestionAnswer.splice(newQuestionAnswer.indexOf(value), 1)
    }

    handleAnswer(newQuestionAnswer, questionId)
  }

  function handleRadioChange (value) {
    if (questionAnswer === value) {
      handleAnswer('', questionId)
    } else {
      handleAnswer(value, questionId)
    }
  }

  function handleRadioKeyDown (event) {
    const { value } = event.target
    if (questionAnswer !== value) return true

    switch (event.key) {
      case ' ':
      case 'Backspace':
      case 'Delete': {
        event.preventDefault()
        event.stopPropagation()

        handleAnswer('', questionId)

        return false
      }
      default: {
        return true
      }
    }
  }

  return (
    <Box
      direction='row'
      wrap
    >
      {options.map((option, index) => {
        let isChecked
        if (type === 'checkbox') {
          isChecked = !!questionAnswer && questionAnswer.indexOf(option.value) > -1
        } else {
          isChecked = questionAnswer === option.value
        }
        let inputHasFocus = false
        if (questionAnswer) {
          inputHasFocus = hasFocus && isChecked
        } else {
          inputHasFocus = hasFocus && (index === 0)
        }

        return (
          <QuestionInput
            key={option.value}
            handleCheckBoxChange={handleCheckBoxChange}
            handleRadioChange={handleRadioChange}
            handleRadioKeyDown={handleRadioKeyDown}
            hasFocus={inputHasFocus}
            isChecked={isChecked}
            option={option}
            questionId={questionId}
            type={type}
          />
        )
      })}
    </Box>
  )
}

InputGroup.defaultProps = {
  handleAnswer: () => {},
  hasFocus: false,
  options: [],
  questionAnswer: '',
  questionId: ''
}

InputGroup.propTypes = {
  handleAnswer: PropTypes.func,
  hasFocus: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  questionAnswer: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]),
  questionId: PropTypes.string,
  type: PropTypes.string.isRequired
}
