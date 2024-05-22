import { node, string, shape } from 'prop-types'

import {
  deletePanoptesUserGroup,
  updatePanoptesUserGroup
} from '@utils'

import { GroupForm } from '@components/shared'

function GroupUpdateFormContainer({
  children,
  group,
  login
}) {
  async function handleGroupDelete() {
    try {
      const deleteResponse = await deletePanoptesUserGroup({ groupId: group?.id })
      if (!deleteResponse.ok) return console.error(deleteResponse)
      
      window.location.href = `https://www.zooniverse.org/users/${login}`
    } catch (error) {
      console.error(error)
    }
  }
  
  async function onSubmit(event) {
    const { display_name, stats_visibility } = event.value
    const data = {
      display_name,
      private: stats_visibility.startsWith('private'),
      stats_visibility
    }

    try {
      const updatedGroupResponse = await updatePanoptesUserGroup({ groupId: group.id, data })
      if (!updatedGroupResponse.ok) return console.error(updatedGroup)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  const groupWithVisibility = {
    ...group,
    visibility: group.stats_visibility.startsWith('private') ? 'Private' : 'Public'
  }

  return (
    <GroupForm
      defaultValue={groupWithVisibility}
      handleDelete={handleGroupDelete}
      handleSubmit={onSubmit}
    >
      {children}
    </GroupForm>
  )
}

GroupUpdateFormContainer.propTypes = {
  children: node,
  group: shape({
    display_name: string,
    id: string,
    stats_visibility: string
  }),
  login: string
}

export default GroupUpdateFormContainer
