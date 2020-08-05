import { Markdownz, pxToRem } from '@zooniverse/react-components'
import { Box, Text } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'
import TaskInput from '../../components/TaskInput'

const maxWidth = pxToRem(60)
const StyledBox = styled(Box)`
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

function DropdownTask (props) {
  const {
    annotation,
    className,
    disabled,
    task,
    theme
  } = props
  const { value } = annotation
  function onChange (index, event) {
    if (event.target.checked) annotation.update(index)
  }
  
  const defaultDropdown = task.selects[0] || {
    title: '',
    options: {}
  }
  
  const defaultOptions = defaultDropdown.options['*'] || []
  
  return (
    <StyledBox
      className={className}
      disabled={disabled}
      theme={theme}
    >
      <StyledText size='small' tag='legend'>
        <Markdownz>
          {defaultDropdown.title}
        </Markdownz>
      </StyledText>

      {defaultOptions.map((option, index) => {
        const checked = (value + 1) ? index === value : false
        return (
          <TaskInput
            autoFocus={checked}
            checked={checked}
            disabled={disabled}
            index={index}
            key={`${task.taskKey}_${index}`}
            label={option.label}
            name={task.taskKey}
            onChange={onChange.bind(this, index)}
            required={task.required}
            type='radio'
          />
        )
      })}
    </StyledBox>
  )
}

DropdownTask.defaultProps = {
  className: '',
  disabled: false,
  theme: {
    global: {
      colors: {}
    }
  }
}

DropdownTask.propTypes = {
  annotation: PropTypes.shape({
    update: PropTypes.func,
    value: PropTypes.number
  }).isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  task: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string
    })),
    help: PropTypes.string,
    question: PropTypes.string,
    required: PropTypes.bool,
    selects: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      options: PropTypes.object,  // TODO: make this a map
    }))
  }).isRequired,
  theme: PropTypes.object
}

export default DropdownTask
