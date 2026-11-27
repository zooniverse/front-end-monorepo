import { useId, useRef } from 'react'
import { Box, CheckBox, Text } from 'grommet'
import { CircleInformation } from 'grommet-icons'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { bool, func, shape, string } from 'prop-types'

const InputFieldContainer = styled(Box)`
  gap: 0.5rem;
`

const StyledHelpIcon = styled(CircleInformation)`
  margin-right: 0.25rem;
`


const StyledCheckBox = styled(CheckBox)`
  margin-top: 0.125rem;
`

const StyledHelpBox = styled(Box)`
  ${props => props.theme.dark
    ? css`color: ${props.theme.global.colors['light-5']};`
    : css`color: ${props.theme.global.colors['dark-5']};`
  }
`

async function DEFAULT_FUNCTION () {}

function FormCheckboxField ({
  disabled = false,
  fieldName = '',
  onInputChange = DEFAULT_FUNCTION,
  user,
}) {
  const { t } = useTranslation()
  const inputId = useId()
  const inputRef = useRef()

  const labelText = t(`Settings.forms.fields.${fieldName}.label`) || ''
  const helpText = t(`Settings.forms.fields.${fieldName}.help`) || ''

  return (
    <InputFieldContainer>
      <Box direction='row' gap='0.5rem' align='start'>
        <StyledCheckBox
          checked={!!user?.[fieldName]}
          data-field={fieldName}
          disabled={disabled}
          id={inputId}
          onChange={onInputChange}
          ref={inputRef}
        />

        <Text
          as='label'
          color={{ light: 'dark-4', dark: 'neutral-6' }}
          htmlFor={inputId}
          size='1rem'
        >
          {labelText}
        </Text>
      </Box>
      {helpText && (
        <StyledHelpBox
          align='center'
          direction='row'
        >
          <StyledHelpIcon size='0.75rem' />
          <Text size='0.75rem'>{helpText}</Text>
        </StyledHelpBox>
      )}      
    </InputFieldContainer>
  )
}

FormCheckboxField.propTypes = {
  disabled: bool,
  fieldName: string,
  onInputChange: func,
  user: shape({
    id: string,
  })
}

export default FormCheckboxField