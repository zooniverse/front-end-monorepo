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

function SimpleDropdownTask (props) {
  const {
    annotation,
    className,
    disabled,
    task,
  } = props
  const { value } = annotation
  
  function setAnnotation (optionValue, optionIndex = 0, isPresetOption = false) {
    annotation.update({
      value: optionValue,
      option: isPresetOption,
    })
  }
  
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
        allowCreate={task.allowCreate}
        annotationValue={value}
        index={0}
        options={task.options}
        setAnnotation={setAnnotation}
      />
    </Box>
  )
}

SimpleDropdownTask.defaultProps = {
  className: '',
  disabled: false,
}

SimpleDropdownTask.propTypes = {
  annotation: PropTypes.shape({
    update: PropTypes.func,
    value: PropTypes.object
  }).isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  task: PropTypes.shape({
    allowCreate: PropTypes.bool,
    help: PropTypes.string,
    instruction: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    required: PropTypes.bool,
  }).isRequired,
}

export default SimpleDropdownTask
