import { v4 as uuidv4 } from 'uuid'

import {
  createPanoptesUserGroup
} from '@utils'

import GroupForm from './GroupForm'

function GroupFormContainer() {
  async function onSubmit(event) {
    const { display_name, stats_visibility } = event.value
    const name = uuidv4()
    const data = {
      name,
      display_name,
      stats_visibility
    }

    try {
      const newGroup = await createPanoptesUserGroup({ data })
      // TODO: route to new group stats page
      window.location.reload()
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
