import { Box } from 'grommet'
import { Loader, StatusMessage } from '@zooniverse/react-components'
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton'

export default function FormStatusAndSubmitField ({
  showLoader = false,  // The logic for when to show the loader (e.g. "form is busy") should be handled in the form itself.
  showSubmit = true,  // Once the form has decided it has a submit button or not, keep it that way. Please do NOT conditionally show/hide the Submit button, as this may be bad for accessibility.
  submitDisabled = false,  // Disable the Submit button (assuming it's rendered)
  submitLabel = '',
  statusMessage,
  statusType,
  ...rest
}) {
  return (
    <Box
      align='center'
      direction='row'
      gap='1rem'
      justify='between'
      wrap={true}
      {...rest}
    >
      {(showSubmit && submitLabel) && (
        <FormSubmitButton
          disabled={submitDisabled}
          label={submitLabel}
          type='submit'
        />
      )}

      <Box
        flex='grow'
        direction='row'
        align='center'
      >
        <StatusMessage
          text={statusMessage}
          type={statusType}
        />
      </Box>

      {showLoader && <Loader />}
    </Box>
  )
}
