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
  
  const defaultSelect = task.selects[0] || {
    allowCreate: false,
    options: {},
    required: false,
    title: '',
  }
  
  const defaultOptions = defaultSelect.options['*'] || []
  
  console.log('+++ defaultSelect: ', defaultSelect)
  
  return (
    <StyledBox
      className={className}
      disabled={disabled}
      theme={theme}
    >
      <StyledText size='small' tag='legend'>
        <Markdownz>
          {defaultSelect.title}
        </Markdownz>
      </StyledText>
    
      <StyledText size='small' tag='legend'>
        allowCreate: {(defaultSelect.allowCreate) ? 'yes' : 'no'}
        &nbsp;
        required: {(defaultSelect.required) ? 'yes' : 'no'}
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
    help: PropTypes.string,
    question: PropTypes.string,
    required: PropTypes.bool,
    selects: PropTypes.arrayOf(PropTypes.shape({
      allowCreate: PropTypes.bool,
      id: PropTypes.string,
      options: PropTypes.object,  // TODO: make this a map
      required: PropTypes.bool,
      title: PropTypes.string,
    }))
  }).isRequired,
  theme: PropTypes.object
}

export default DropdownTask
