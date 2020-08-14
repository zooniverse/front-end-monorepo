import { Markdownz, pxToRem } from '@zooniverse/react-components'
import { Box, Select, Text, TextInput } from 'grommet'
import { Down, FormNext } from 'grommet-icons'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'
import counterpart from 'counterpart'
import en from './locales/en'

counterpart.registerTranslations('en', en)

// TODO: clean up above

const maxWidth = pxToRem(60)
const StyledBox = styled(Box)`
  img:only-child, svg:only-child {
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

function DdSelect (props) {
  const {
    annotationValue,
    index,
    options,
    selectConfig,
    setAnnotation,
    theme,
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
  if (selectConfig.allowCreate) {
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
    <StyledBox
      margin={{ vertical: 'xsmall' }}
      theme={theme}
    >
      <StyledText size='small' tag='legend'>
        <Markdownz>
          {selectConfig.title}
        </Markdownz>
      </StyledText>

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
    </StyledBox>
    

  )
}

DdSelect.defaultProps = {
  annotationValue: undefined,
  index: 0,
  options: [],
  selectConfig: {},
  setAnnotation: () => {},
  theme: {
    global: {
      colors: {}
    }
  },
}

DdSelect.propTypes = {
  annotationValue: PropTypes.object,
  index: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.object),
  selectConfig: PropTypes.object,
  setAnnotation: PropTypes.func,
  theme: PropTypes.object,
}

export default DdSelect
