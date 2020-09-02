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
  
  // Decide what kind of options to display.
  // Use an array of objects instead of an array of text.
  // This solves issues of duplicate text.
  const optionsToDisplay = task.options.map(opt => ({
    text: opt,
  }))
  
  // If the Other option is enabled, we allow users to type in any text.
  const otherOption = {
    text: counterpart('Dropdown.otherLabel')
  }
  if (selectConfig.allowCreate && ENABLE_OTHER_OPTION) {
    optionsToDisplay.push(otherOption)
  }
  
  // Determine which option is selected.
  const selectedOption = (value?.option)
    ? optionsToDisplay[value?.selection]
    : (value?.option === false)  // distinguishes between value simply not existing
    ? otherOption
    : undefined

  // The following is only relevant if the Other option is enabled.
  const [customValue, setCustomValue] = React.useState((selectedOption === otherOption) ? value?.selection : '')
  const showCustomInput = (selectedOption === otherOption)
  const customInput = React.useRef()
  
  // 'selection' indicates the index of the selected answer. (number)
  // If the Other option is enabled, selection can be a string.
  function setAnnotation (selection, isPresetOption = false) {
    annotation.update({
      selection: selection,
      option: isPresetOption,
    })
  }
  
  function onSelectChange ({ option, selected: selectionIndex }) {
    const isPresetOption = option !== otherOption
    setCustomValue('')
    
    if (isPresetOption) {
      setAnnotation(selectionIndex, true)
    } else {
      setAnnotation('', false)
    }
  }
  
  function onTextInputChange () {
    const ele = customInput && customInput.current || { value: '' }
    setAnnotation(ele.value, false)
    setCustomValue(ele.value)
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
        
        {(showCustomInput) &&
          <TextInput
            onChange={onTextInputChange}
            placeholder={counterpart('Dropdown.customInputPlaceholder')}
            ref={customInput}
            size='small'
            value={customValue}
          />
        }
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
