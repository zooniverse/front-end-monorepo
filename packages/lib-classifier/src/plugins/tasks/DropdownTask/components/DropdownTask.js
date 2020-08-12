import { Markdownz, pxToRem } from '@zooniverse/react-components'
import { Box, Select, Text } from 'grommet'
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
  
  function onDropdownChange (value, event) {
    if (event.target.checked) setAnnotation(value, true)
  }
  
  function setAnnotation (value, isPresetOption = false) {
    annotation.update([{
      value: value,
      option: isPresetOption,
    }])
  }
  
  const defaultSelect = task.selects[0] || {
    allowCreate: false,
    options: {},
    required: false,
    title: '',
  }
  
  const defaultOptions = (defaultSelect.options['*'])
    ? defaultSelect.options['*'].map(option => {
        return {
          label: option.label,
          value: option.value,
          presetOption: true,
        }
      })
    : []
  
  if (defaultSelect.allowCreate) {
    defaultOptions.push({
      label: '((other))',
      value: '*',
      presetOption: false,
    })
  }
  
  const defaultValue = undefined  // TODO, use 'value'
  console.log('+++ YO YO: ', value, value[0])
  
  return (
    <StyledBox
      className={className}
      disabled={disabled}
      theme={theme}
    >
      <StyledText size='small' tag='legend'>
        <Markdownz>
          {task.instruction}
        </Markdownz>
      </StyledText>
    
      <StyledBox
        border="dashed"
        pad="small"
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
        
        <Select
          options={defaultOptions}
          placeholder={'Select an option'}
          onChange={({ option, value }) => {
            console.log('+++ Selected: ', option, value)
          }}
          labelKey={'label'}
          valueKey={'value'}
        />

        {/*defaultOptions.map((option, index) => {
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
              onChange={onDropdownChange.bind(this, option.value)}
              required={task.required}
              type='radio'
            />
          )
        })*/}
      </StyledBox>
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
    instruction: PropTypes.string,
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
