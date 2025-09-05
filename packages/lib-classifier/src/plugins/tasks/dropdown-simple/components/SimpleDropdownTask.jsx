import { Markdownz } from '@zooniverse/react-components'
import { Box, Select, Text } from 'grommet'
import { Down } from 'grommet-icons'
import { observer } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import PropTypes from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from '@translations/i18n'

const StyledText = styled(Text)`
  margin: 0;
  padding: 0;
  width: 100%;

  > *:first-child {
    margin-top: 0;
  }
`

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
  const [selectedOption, setSelectedOption] = useState('')

  // Process snapshot to get array of text options
  const optionsToDisplay = Object.entries(stringsSnapshot)
    .filter(([key, value]) => key.startsWith(optionsPrefix))
    .map(([key, value]) => value)
  const [filteredOptions, setFilteredOptions] = useState(optionsToDisplay)

  // If there is an annotation, we set that value as the selectedOption
  if (value?.option === true && selectedOption !== optionsToDisplay[value?.selection]) {
    setSelectedOption(optionsToDisplay[value?.selection])
  }

  // Responsible for input value and updating the annotation value
  // Grommet Select does now allow clearing the input value, so we know onChange handles a valid annotation value
  function onChange(ev) {
    let matchIndex = optionsToDisplay.indexOf(ev.value)
    setSelectedOption(ev.value)
    annotation.update({
      selection: matchIndex,
      option: true
    })
  }

  // Filter the full list of options when searching
  function onSearch(text) {
    const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    const exp = new RegExp(escapedText, 'i');
    setFilteredOptions(optionsToDisplay.filter((o) => exp.test(o)));
  }
  
  // onBlur() is called on focus (weird Grommet behavior)
  // Therefore, we clear our search value whenever we "focus" the input
  function onBlur() {
    onSearch('')
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
          onChange={onChange}
          onSearch={onSearch}
          onBlur={onBlur}
          options={filteredOptions}
          placeholder={t('SimpleDropdownTask.selectPlaceholder')}
          size='small'
          value={selectedOption}
        />
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
