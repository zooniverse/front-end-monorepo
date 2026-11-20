import { useId, useRef } from 'react'
import { Box, Text, TextInput } from 'grommet'
import { CircleInformation } from 'grommet-icons'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { bool, func, shape, string } from 'prop-types'

import BigLabel from '../BigLabel/BigLabel'

const InputFieldContainer = styled(Box)`
  gap: 0.5em;

  input:user-invalid {
    border-color: ${props => props.theme.global.colors['neutral-4']};
  }
`

const StyledHelpIcon = styled(CircleInformation)`
  margin-right: 0.25rem;
`

const StyledTextInput = styled(TextInput)`
  font-size: 1rem;
  font-weight: 500;
  ${props => props.theme.dark
    ? css`color: ${props.theme.global.colors['neutral-6']};`
    : css`color: ${props.theme.global.colors['neutral-7']};`
  }
`

const StyledHelpBox = styled(Box)`
  ${props => props.theme.dark
    ? css`color: ${props.theme.global.colors['light-5']};`
    : css`color: ${props.theme.global.colors['dark-5']};`
  }
`

async function DEFAULT_FUNCTION () {}

function FormInputField ({
  autocomplete,
  disabled = false,
  fieldName = '',
  pattern = undefined,
  onInputChange = DEFAULT_FUNCTION,
  optional = false,
  required = false,
  type = 'text',
  user,
}) {
  const { t } = useTranslation()
  const inputId = useId()
  const inputRef = useRef()

  const labelText = t(`Settings.forms.fields.${fieldName}.label`) || ''
  const helpText = t(`Settings.forms.fields.${fieldName}.help`) || ''

  console.log('+++ autocomplete', autocomplete)

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
          <Text
            color={{ light: 'dark-5', dark: 'light-5' }}
          >
            {t('Settings.forms.optional')}
          </Text>
        }
      </Box>
      <StyledTextInput
        autoComplete={autocomplete}  // This needs to have that capital 'C' to work.
        data-field={fieldName}
        disabled={disabled}
        id={inputId}
        name={fieldName}
        onChange={onInputChange}
        pattern={pattern}
        ref={inputRef}
        required={required}
        type={type}
        value={user?.[fieldName] || ''}
      />
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

FormInputField.propTypes = {
  autocomplete: string,
  disabled: bool,
  fieldName: string,
  inputPattern: string,
  onInputChange: func,
  optional: bool,
  pattern: string,
  required: bool,
  type: string,
  user: shape({
    credited_name: string,
    display_name: string,
    email: string,
    id: string,
  })
}

export default FormInputField