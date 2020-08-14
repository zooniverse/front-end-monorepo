import { Markdownz, pxToRem } from '@zooniverse/react-components'
import { Box, Select, Text } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

// TODO: clean up above

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
    const isPresetOption = option !== otherOption
    setAnnotation(option.value, index, isPresetOption)
    setSelectedOption(option)
  }
  
  const otherOption = {
    label: '((other))',
    value: '*',
  }
  
  const optionsToDisplay = options.slice()
  if (selectConfig.allowCreate) {
    optionsToDisplay.push(otherOption)
  }
  
  let so = undefined
  if (annotationValue) {
    so = (annotationValue.option)
      ? optionsToDisplay.find(o => annotationValue.value === o.value)
      : otherOption
  }
  const [selectedOption, setSelectedOption] = React.useState(so);
  
  return (
    <StyledBox
      border="dashed"
      pad="small"
      theme={theme}
    >
      <StyledText size='small' tag='legend'>
        <Markdownz>
          {selectConfig.title}
        </Markdownz>
      </StyledText>

      <StyledText size='small' tag='legend'>
        allowCreate: {(selectConfig.allowCreate) ? 'yes' : 'no'}
        &nbsp;
        required: {(selectConfig.required) ? 'yes' : 'no'}
        &nbsp;
        value: ({selectedOption && selectedOption.value})
      </StyledText>

      <Select
        options={optionsToDisplay}
        placeholder={'Select an option'}
        onChange={onSelectChange.bind(this)}
        labelKey={'label'}
        valueKey={'value'}
        value={selectedOption}
      />
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
