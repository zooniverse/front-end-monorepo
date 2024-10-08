import { Markdownz } from '@zooniverse/react-components'
import { Box, Text } from 'grommet'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import styled, { css, useTheme } from 'styled-components'
import TaskInput from '../../components/TaskInput'

const StyledFieldset = styled.fieldset`
  border: none;
  padding: 0;

  &:focus-visible {
    outline: none;
    ${props => props.focusColor && css`box-shadow: 0 0 2px 2px ${props.focusColor};`}
  }

  img:only-child, svg:only-child {
    ${props => props.theme && css`background: ${props.theme.global.colors.brand};`}
    max-width: 2.5rem;
  }
`

const StyledText = styled(Text)`
  margin: 0;
  padding: 0;
  width: 100%;

  > *:first-child {
    margin-top: 0;
  }
`

const inlineComponents = {
  p: StyledText
}

function SingleChoiceTask ({
  annotation,
  autoFocus = false,
  className = '',
  disabled = false,
  task
}) {
  const fieldset = useRef()
  const theme = useTheme()
  const focusColor = theme?.global.colors[theme?.global.colors.focus]
  const { value } = annotation
  const questionHasFocus = autoFocus && value === null
  
  useEffect(function autofocusFieldset() {
    if (questionHasFocus && document.activeElement !== fieldset.current) {
      fieldset.current?.focus()
    }
  }, [questionHasFocus])

  function onChange (index, event) {
    if (event.target.checked) annotation.update(index)
  }

  return (
    <Box
      as={StyledFieldset}
      ref={fieldset}
      className={className}
      disabled={disabled}
      focusColor={focusColor}
      tabIndex={-1}
      theme={theme}
    >
      <StyledText as='legend' size='small'>
        <Markdownz components={inlineComponents}>
          {task.question}
        </Markdownz>
      </StyledText>

      {task.answers.map((answer, index) => {
        const checked = (value + 1) ? index === value : false
        return (
          <TaskInput
            autoFocus={checked}
            checked={checked}
            disabled={disabled}
            index={index}
            key={`${task.taskKey}_${index}`}
            label={task.strings.get(`answers.${index}.label`)}
            name={task.taskKey}
            onChange={onChange.bind(this, index)}
            required={task.required}
            type='radio'
          />
        )
      })}
    </Box>
  )
}

SingleChoiceTask.propTypes = {
  annotation: PropTypes.shape({
    update: PropTypes.func,
    value: PropTypes.number
  }).isRequired,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  task: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string
    })),
    help: PropTypes.string,
    question: PropTypes.string,
    required: PropTypes.bool
  }).isRequired
}

export default observer(SingleChoiceTask)
