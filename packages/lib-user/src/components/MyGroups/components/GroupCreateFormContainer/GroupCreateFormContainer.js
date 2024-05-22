import { v4 as uuidv4 } from 'uuid'

import { createPanoptesUserGroup } from '@utils'

import { GroupForm } from '@components/shared'

function GroupCreateFormContainer() {
  async function onSubmit(event) {
    const { display_name, stats_visibility } = event.value
    const name = uuidv4()
    const data = {
      name,
      display_name,
      private: stats_visibility.startsWith('private'),
      stats_visibility
    }

    try {
      const newGroupResponse = await createPanoptesUserGroup({ data })
      if (!newGroupResponse.ok) return console.error(newGroupResponse)
      const newGroup = newGroupResponse.body.user_groups[0]
      if (!newGroup.id) return window.location.reload()
      window.location.href = `/groups/${newGroup.id}`
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

export default GroupCreateFormContainer
