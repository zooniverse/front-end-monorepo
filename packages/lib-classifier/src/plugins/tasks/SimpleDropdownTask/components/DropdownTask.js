import { Markdownz, pxToRem } from '@zooniverse/react-components'
import { Box, Text } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'
import DdSelect from './DdSelect'

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
  } = props
  const { value } = annotation
  
  function setAnnotation (optionValue, optionIndex = 0, isPresetOption = false) {
    const newAnnotationValue = (value && value.slice()) || []
    newAnnotationValue[optionIndex] = {
      value: optionValue,
      option: isPresetOption,
    }
    annotation.update(newAnnotationValue)
    
    // TODO: if using cascading dropdowns, we probably need to wipe out all existing answers past optionIndex.
  }
  
  // Simple Dropdown: only the first <select> matters
  const defaultSelect = task.selects[0] || {
    allowCreate: false,
    options: {},
    required: false,
    title: '',
  }
  
  // Simple Dropdown: only the first set of <option>s matters
  const defaultOptions = (defaultSelect.options['*'])
    ? defaultSelect.options['*'].slice()
    : []
  
  return (
    <Box
      className={className}
      disabled={disabled}
    >
      <StyledText size='small' tag='legend'>
        <Markdownz>
          {task.instruction}
        </Markdownz>
      </StyledText>
        
      <DdSelect
        annotationValue={value && value[0]}
        index={0}
        options={defaultOptions}
        selectConfig={defaultSelect}
        setAnnotation={setAnnotation}
      />
    </Box>
  )
}

DropdownTask.defaultProps = {
  className: '',
  disabled: false,
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
}

export default DropdownTask
