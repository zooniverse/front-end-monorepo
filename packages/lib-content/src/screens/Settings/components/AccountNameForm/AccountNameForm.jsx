import { useId, useRef } from 'react'
import { Box, Form, Text, TextInput } from 'grommet'
import { Loader } from '@zooniverse/react-components'
import styled from 'styled-components'
import DarkTealPrimaryButton from '../../../Unsubscribe/components/DarkTealPrimaryButton/DarkTealPrimaryButton'

const FormFieldsContainer = styled(Box)`
  gap: 1em;

  input:user-invalid {
    border-color: ${props => props.theme.global.colors['neutral-4']};
  }
`

const InputField = styled(Box)`
  gap: 0.5em;
`

const BigLabel = styled(Text)`
  font-weight: 700;
  font-style: bold;
  text-transform: uppercase;
`

async function DEFAULT_FUNCTION () {}

export default function AccountNameForm ({
  user,
  mutateUser = DEFAULT_FUNCTION,
  updateUserData = DEFAULT_FUNCTION,
  authUser,
  isLoading = false,
  isValidating = false,
}) {
  const displayNameInputId = useId()
  const displayNameInputRef = useRef()

  if (!user) return null

  function onInputChange (e) {
    const value = e.target.value
    const field = e.target.dataset.field

    // This mutates the data returned from useUserData(). Because the UI component's TextInput
    // is "hooked in" to data returned from useUserData() as "state", this pattern is a replacement
    // for a [value, setValue] = useState() pattern.
    // No network requests until the user clicks "Save".
    mutateUser(prevData => {
      return {
        ...prevData,
        [field]: value
      }
    }, { revalidate: false })  // Don't revalidate, the returned object is the new "state"
  }

  function onSubmit () {

    // TODO: validate input.
    const displayName = displayNameInputRef.current.value

    mutateUser(
      async prevData => {
        await updateUserData({
          ['display_name']: displayName
        }, authUser.id)
        // this async function must return something for the cache
        return prevData // already updated by onInputChange mutate
      },
      {
        optimisticData: prevData => {
          return prevData // already updated by onInputChange mutate
        },
        // don't need to revalidate because optimisticData updates {data: user} returned
        // from useUserData().
        revalidate: false,
        // rollbackOnError responds to an error thrown by updateCreditedName(). So make sure to throw in that helper function.
        rollbackOnError(err) {
          console.error(err)
          return true
        }
      }
    )
  }

  const disableInput = isLoading || isValidating

  return (
    <Form
      className='AccountNameForm'
      onSubmit={onSubmit}
    >
      <FormFieldsContainer margin={{ vertical: 'small' }}>
        <InputField>
          <Box direction='row' gap='1em' align='center'>
            <BigLabel
              as='label'
              htmlFor={displayNameInputId}
            >
              Example Input
            </BigLabel>
            <Text>Optional</Text>
          </Box>
          <TextInput
            id={displayNameInputId}
            name='display_name'
            ref={displayNameInputRef}
            data-field='display_name'
            value={user.display_name || ''}
            onChange={onInputChange}
          />
          <Text>Extra information</Text>
        </InputField>

        <Box>
          {(isLoading || isValidating) && <Loader />}
          <DarkTealPrimaryButton
            type='submit'
            disabled={disableInput}
          >
            Save
          </DarkTealPrimaryButton>
          <DarkTealPrimaryButton
            disabled={disableInput}
            label={'TODO: SAVE'}
            type='submit'
          />
        </Box>
      </FormFieldsContainer>
    </Form>
  )
}