import { CheckBox, Form } from 'grommet'
import { Loader, StatusMessage } from '@zooniverse/react-components'

import useUserData from '../useUserData'
import updateUserProperty from '../updateUserProperty'

/* Example of a client-side React component with a checkbox that when updated, it does a PUT request to panoptes and updates UI optimistically */
function FormWithCheckbox({ authUser }) {
  // Pass this hook the `authUser`'s login prop from the app-root page.
  // The UI component's Checkbox is "hooked in" to `data` that's returned here as state.
  // It's a replacement for a [isChecked, setIsChecked] = useState() pattern, and it handles all
  // loading, error, and revalidating states too.
  const { data: user, loading, error, isValidating, mutate } = useUserData({ login: authUser?.login })

  const handleChange = e => {
    // This mutate function is bound to useUserData() SWR hook. It updates the client-side cache
    // specifically for the unique key passed to SWR in useUserData().
    mutate(
      async prevData => {
        // Make a PUT request
        await updateUserProperty('intervention_notifications', e.target.checked, authUser.id)
        // this async function must return something for the cache
        return {
          ...prevData,
          intervention_notifications: e.target.checked
        }
      },
      {
        optimisticData: prevData => {
          // prevData is the user data returned from useUserData() before the user clicked it
          // Optimistically show the user-edited value in the Checkbox after they clicked it, but before the network request happens
          const newUserData = {
            ...prevData,
            intervention_notifications: e.target.checked
          }
          return newUserData
        },
        // don't need to revalidate because optimisticData updates data returned from useUserData() above.
        revalidate: false,
        // rollbackOnError responds to an error thrown by updateInterventionsPreference(). So make sure to throw in that helper function.
        rollbackOnError(err) {
          console.error(err)
          return true
        }
      }
    )
  }

  return (
    <Form>
      <CheckBox
        checked={user?.['intervention_notifications']}
        disabled={loading || isValidating}
        label='Yes I want to see interventions while classifying.'
        onChange={handleChange}
      />
      <StatusMessage type={error ? 'error' : ''} text={error ? error.message : ''} />
    </Form>
  )
}

export default FormWithCheckbox
