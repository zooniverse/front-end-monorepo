import GroupForm from './GroupForm'

import {
  createPanoptesUserGroup,
  getBearerToken
} from '@utils'

function GroupFormContainer() {
  async function onSubmit(event) {
    console.log('submitting...', event.value)

    try {
      // const authorization = await getBearerToken(authClient)
      // const newGroup = await createPanoptesUserGroup({
      //   data,
      //   authorization 
      // })
      // console.log('newGroup', newGroup)
      // window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <GroupForm
      handleSubmit={onSubmit}
    />
  )
}

export default GroupFormContainer
