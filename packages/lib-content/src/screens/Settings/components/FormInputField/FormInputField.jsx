import { useId, useRef } from 'react'
import { Box, Text, TextInput } from 'grommet'
import { CircleInformation } from 'grommet-icons'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { bool, func, shape, string } from 'prop-types'

const InputFieldContainer = styled(Box)`
  gap: 0.5em;

  input:user-invalid {
    border-color: ${props => props.theme.global.colors['neutral-4']};
  }
`

const BigLabel = styled(Text)`
  font-weight: 700;
  font-style: bold;
  text-transform: uppercase;
`

const StyledHelpIcon = styled(CircleInformation)`
  margin-top: 4px;
  margin-right: 0.5em;
`

async function DEFAULT_FUNCTION () {}

function FormInputField ({
  disabled = false,
  fieldName = '',
  pattern = undefined,
  onInputChange = DEFAULT_FUNCTION,
  optional = false,
  required = false,
  user,
}) {
  const { t } = useTranslation()
  const inputId = useId()
  const inputRef = useRef()

  const labelText = t(`Settings.forms.fields.${fieldName}.label`) || ''
  const helpText = t(`Settings.forms.fields.${fieldName}.help`) || ''

  return (
    <InputFieldContainer>
      <Box direction='row' gap='1em' align='center'>
        <BigLabel
          as='label'
          htmlFor={inputId}
        >
          {labelText}
        </BigLabel>
        {optional &&
          <Text>{t('Settings.forms.optional')}</Text>
        }
      </Box>
      <TextInput
        data-field={fieldName}
        disabled={disabled}
        id={inputId}
        name={fieldName}
        onChange={onInputChange}
        pattern={pattern}
        ref={inputRef}
        required={required}
        value={user?.[fieldName] || ''}
      />
      {helpText && (
        <Box
          direction='row'
        >
          <StyledHelpIcon size='small' />
          <Text>{helpText}</Text>
        </Box>
      )}      
    </InputFieldContainer>
  )
}

FormInputField.propTypes = {
  disabled: bool,
  fieldName: string,
  inputPattern: string,
  onInputChange: func,
  optional: bool,
  user: shape({
    credited_name: string,
    display_name: string,
    email: string,
    id: string,
  })
}

export default FormInputField