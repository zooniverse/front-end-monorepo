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

function DdSelect (props) {
  const {
    annotationValue,
    index,
    options,
    selectConfig,
    setAnnotation,
  } = props
  
  function onSelectChange ({ option }) {
    setSelectedOption(option)
    const isPresetOption = option !== otherOption
    
    if (isPresetOption) {
      setAnnotation(option.value, index, true)
      setCustomInputVisibility(false)
      setCustomValue('')
    } else {
      setAnnotation('', index, false)
      setCustomInputVisibility(true)
      setCustomValue('')
    }
  }
  
  function onTextInputChange () {
    const ele = customInput && customInput.current || { value: '' }
    setAnnotation(ele.value, index, false)
    setCustomValue(ele.value)
  }
  
  const otherOption = {
    label: counterpart('Dropdown.otherLabel'),
    value: '*',
  }
  
  const optionsToDisplay = options.slice()
  if (selectConfig.allowCreate && ENABLE_OTHER_OPTION) {
    optionsToDisplay.push(otherOption)
  }
  
  let initialOption = undefined
  if (annotationValue) {
    initialOption = (annotationValue.option)
      ? optionsToDisplay.find(o => annotationValue.value === o.value)
      : otherOption
  }
  
  const [selectedOption, setSelectedOption] = React.useState(initialOption)
  const [customValue, setCustomValue] = React.useState(annotationValue && annotationValue.value)
  const [customInputVisibility, setCustomInputVisibility] = React.useState(selectedOption === otherOption)
  const customInput = React.useRef()
  
  return (
    <Box
      gap='xsmall'
    >
      <Select
        icon={<Down size='small' />}
        labelKey='label'
        onChange={onSelectChange}
        options={optionsToDisplay}
        placeholder={counterpart('Dropdown.selectPlaceholder')}
        size='small'
        value={selectedOption}
        valueKey='value'
      />

      {(customInputVisibility) &&
        <TextInput
          onChange={onTextInputChange}
          placeholder={counterpart('Dropdown.customInputPlaceholder')}
          ref={customInput}
          size='small'
          value={customValue}
        />
      }
    </Box>
  )
}

DdSelect.defaultProps = {
  annotationValue: undefined,
  index: 0,
  options: [],
  selectConfig: {},
  setAnnotation: () => {},
}

DdSelect.propTypes = {
  annotationValue: PropTypes.object,
  index: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.object),
  selectConfig: PropTypes.object,
  setAnnotation: PropTypes.func,
}

export default DdSelect
