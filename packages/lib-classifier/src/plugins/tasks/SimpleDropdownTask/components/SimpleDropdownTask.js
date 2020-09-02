import { Markdownz, pxToRem } from '@zooniverse/react-components'
import { Box, Select, Text, TextInput } from 'grommet'
import { Down } from 'grommet-icons'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

import counterpart from 'counterpart'
import en from './locales/en'
counterpart.registerTranslations('en', en)

const StyledText = styled(Text)`
  margin: 0;
  padding: 0;
  width: 100%;

  > *:first-child {
    margin-top: 0;
  }
`

// The 'other' option, aka 'allow user to create any answer' option, is
// artificially disabled. Please refer to the README. (@shaunanoordin 20200820)
const ENABLE_OTHER_OPTION = false

function SimpleDropdownTask (props) {
  const {
    annotation,
    className,
    disabled,
    task,
  } = props
  const { value } = annotation
  
  const optionsToDisplay = task.options.map(opt => ({
    text: opt,
  }))
  const otherOption = {
    text: counterpart('Dropdown.otherLabel')
  }
  
  const initialOption = (annotation.value?.option)
    ? optionsToDisplay[annotation.value.selection]
    : (annotation.value?.option === false)  // distinguishes between value simply not existing
    ? otherOption
    : undefined

  const [selectedOption, setSelectedOption] = React.useState(initialOption)
  // const [customValue, setCustomValue] = React.useState(annotationValue && annotationValue.value)
  // const [customInputVisibility, setCustomInputVisibility] = React.useState(selectedOption === otherOption)
  // const customInput = React.useRef()
  
  function setAnnotation (selection, isPresetOption = false) {
    annotation.update({
      selection: selection,
      option: isPresetOption,
    })
  }
  
  function onSelectChange ({ option, selected: selectionIndex }) {
    setSelectedOption(option)
    const isPresetOption = true  // option !== otherOption
    
    if (isPresetOption) {
      setAnnotation(selectionIndex, true)
    } else {
      setAnnotation(-1, false)
    }
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
        
      <Box
        gap='xsmall'
      >
        <Select
          icon={<Down size='small' />}
          labelKey='text'
          onChange={onSelectChange}
          options={optionsToDisplay}
          placeholder={counterpart('Dropdown.selectPlaceholder')}
          size='small'
          value={selectedOption}
        />
      </Box>
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
