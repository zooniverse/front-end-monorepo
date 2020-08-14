import { Markdownz, pxToRem } from '@zooniverse/react-components'
import { Box, Select, Text } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'
import DdSelect from './DdSelect'

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
  
  function onDropdownChange ({ option }) {
    const isPresetOption = option !== otherOption
    setAnnotation(option.value, isPresetOption)
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
    ? defaultSelect.options['*'].slice()
    : []
  
  const otherOption = {
    label: '((other))',
    value: '*',
  }
  
  if (defaultSelect.allowCreate) {
    defaultOptions.push(otherOption)
  }
  
  let selectedOption = undefined
  const currentAnnotationValue = value && value[0]
  if (currentAnnotationValue) {
    selectedOption = (currentAnnotationValue.option)
      ? defaultOptions.find(o => currentAnnotationValue.value === o.value)
      : otherOption
  }
  
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
          onChange={onDropdownChange.bind(this)}
          labelKey={'label'}
          valueKey={'value'}
          value={selectedOption}
        />
      </StyledBox>
        
      <DdSelect
        annotationValue={undefined}
        index={0}
        options={defaultOptions}
        selectConfig={defaultSelect}
        setAnnotation={() => {}}
        theme={theme}
      />
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
