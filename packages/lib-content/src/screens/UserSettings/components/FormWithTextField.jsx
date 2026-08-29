import { Button, Form, Heading, Text, TextInput } from 'grommet'
import { useId, useRef } from 'react'
import { Loader, StatusMessage } from '@zooniverse/react-components'

import useUserData from '../useUserData'
import updateUserProperty from '../updateUserProperty'

/* Example of a client-side React component with a text field that when submitted, it does a PUT request to panoptes and updates UI optimistically */
function FormWithTextField({ authUser }) {
  const creditedNameInputId = useId()
  const creditedNameRef = useRef()

  // Pass this hook the `authUser`'s login prop from the app-root page.
  // The UI component's TextInputis "hooked in" to `data` as "state", so
  // this is a replacement for a [value, setValue] = useState() pattern.
  const { data: user, loading, error, isValidating, mutate } = useUserData({ login: authUser?.login })

  const handleChange = e => {
    const newValue = e.target.value

    // This mutates the data returned from useUserData(). Because the UI component's TextInput
    // is "hooked in" to data returned from useUserData() as "state", this pattern is a replacement
    // for a [value, setValue] = useState() pattern.
    // No network requests until the user clicks "Save".
    mutate(
      prevData => {
        return {
          ...prevData,
          credited_name: newValue
        }
      },
      { revalidate: false } // don't revalidate, the returned object is the new "state"
    )
  }

  const handleSubmit = () => {
    // You could add code here to check for invalid emojis or other characters that
    // shouldn't be stored as a credited name in our database.

    mutate(
      // Make a PUT request when the Save button is clicked
      // Advantage to using mutate here instead of just updateUserProperty() by itself is loading/validating state handling
      async prevData => {
        await updateUserProperty('credited_name', creditedNameRef.current?.value, authUser.id)
        // this async function must return something for the cache
        return prevData // already updated by handleChange mutate
      },
      {
        optimisticData: prevData => {
          return prevData // already updated by handleChange mutate
        },
        // don't need to revalidate because optimisticData updates {data: user} returned
        // from useUserData() above.
        revalidate: false,
        // rollbackOnError responds to an error thrown by updateCreditedName(). So make sure to throw in that helper function.
        rollbackOnError(err) {
          console.error(err)
          return true
        }
      }
    )
  }

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor={creditedNameInputId}>
        <Text>Credited Name</Text>
      </label>
      <TextInput
        ref={creditedNameRef}
        id={creditedNameInputId}
        name='credited-name'
        onChange={handleChange}
        type='text'
        value={user?.credited_name ?? ''}
      />
      <Button
        type='submit'
        disabled={loading || isValidating}
        label='Save'
        margin={{ top: 'small' }}
      />
      <StatusMessage type={error ? 'error' : ''} text={error ? error.message : ''} />
    </Form>
  )
}

export default FormWithTextField
