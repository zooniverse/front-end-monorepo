import { Markdownz, pxToRem } from '@zooniverse/react-components'
import { Box, Select, Text, TextInput } from 'grommet'
import { Down } from 'grommet-icons'
import { observer } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import PropTypes from 'prop-types'
import { useState, useRef } from 'react';
import styled, { css } from 'styled-components'
import { useTranslation } from '@translations/i18n'

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

function SimpleDropdownTask({
  annotation,
  className = '',
  disabled = false,
  task,
}) {
  const { t } = useTranslation('plugins')
  const { value } = annotation
  const stringsSnapshot = getSnapshot(task.strings)
  const optionsPrefix = 'selects.0.options.*.'

  // Decide what kind of options to display.
  // Use an array of objects instead of an array of text.
  // This solves issues of duplicate text.
  const optionsToDisplay = Object.entries(stringsSnapshot)
  .filter(([key, value]) => key.startsWith(optionsPrefix))
  .map(([key, value]) => ({
    text: value
  }))

  // If the Other option is enabled, we allow users to type in any text.
  const otherOption = {
    text: t('SimpleDropdownTask.otherLabel')
  }
  if (task.allowCreate && ENABLE_OTHER_OPTION) {
    optionsToDisplay.push(otherOption)
  }

  // Determine which option is selected.
  let selectedOption = undefined
  if (value?.option === true) {
    selectedOption = optionsToDisplay[value?.selection]
  } else if (value?.option === false) { // Note: this distinguishes between value = undefined
    selectedOption = otherOption
  }

  // The following is only relevant if the Other option is enabled.
  const [customValue, setCustomValue] = useState((selectedOption === otherOption) ? value?.selection : '')
  const showCustomInput = (selectedOption === otherOption)
  const customInput = useRef()

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
    >
      <StyledText as='legend' size='small'>
        <Markdownz>
          {task.instruction}
        </Markdownz>
      </StyledText>

      <Box
        gap='xsmall'
      >
        <Select
          disabled={disabled}
          icon={<Down size='small' />}
          labelKey='text'
          onChange={onSelectChange}
          options={optionsToDisplay}
          placeholder={t('SimpleDropdownTask.selectPlaceholder')}
          size='small'
          value={selectedOption}
        />

        {(showCustomInput) &&
          <TextInput
            onChange={onTextInputChange}
            placeholder={t('SimpleDropdownTask.customInputPlaceholder')}
            ref={customInput}
            size='small'
            value={customValue}
          />
        }
      </Box>
    </Box>
  )
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

export default observer(SimpleDropdownTask)
