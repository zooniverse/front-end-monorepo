import { Markdownz } from '@zooniverse/react-components'
import pxToRem from '@zooniverse/react-components/helpers/pxToRem'
import { Box, Text } from 'grommet'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import styled, { css, useTheme } from 'styled-components'
import TaskInput from '../../components/TaskInput'

const maxWidth = pxToRem(60)
const StyledFieldset = styled.fieldset`
  border: none;
  img:only-child, svg:only-child {
    ${props => props.theme && css`background: ${props.theme.global.colors.brand};`}
    max-width: ${maxWidth};
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
  const theme = useTheme()
  const { value } = annotation
  function onChange (index, event) {
    if (event.target.checked) annotation.update(index)
  }

  return (
    <Box
      as={StyledFieldset}
      className={className}
      disabled={disabled}
      tabIndex={0}
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
