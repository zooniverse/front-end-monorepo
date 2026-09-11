import { Box, Form, Text, TextInput } from 'grommet'
import { SpacedText } from '@zooniverse/react-components'
import styled from 'styled-components'

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

export default function AccountNameForm ({ user }) {
  if (!user) return null

  function onSubmit () {}

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
              htmlFor='example_input'
            >
              Example Input
            </BigLabel>
            <Text>Optional</Text>
          </Box>
          <TextInput
            id='example_input'
            name='example_input'
          />
          <Text>Extra information</Text>
        </InputField>
      </FormFieldsContainer>
    </Form>
  )
}