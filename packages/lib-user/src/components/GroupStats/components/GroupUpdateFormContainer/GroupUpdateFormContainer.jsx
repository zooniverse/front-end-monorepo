import { bool, func, node, shape, string } from 'prop-types'
import useSWRMutation from 'swr/mutation'
import { useTranslation } from '@translations/i18n'

import {
  deletePanoptesUserGroup,
  updatePanoptesUserGroup
} from '@utils'

import { GroupForm } from '@components/shared'

const DEFAULT_HANDLER = () => true

function GroupUpdateFormContainer({
  adminMode,
  authUserId,
  children,
  group,
  handleGroupModalActive = DEFAULT_HANDLER,
  login
}) {
  const { t } = useTranslation()
  const { trigger: updateGroup } = useSWRMutation({
    adminMode,
    authUserId,
    groupId: group?.id
  }, updatePanoptesUserGroup)

  async function handleGroupDelete() {
    try {
      const deleteResponse = await deletePanoptesUserGroup({ groupId: group?.id })
      if (!deleteResponse.ok) {
        await alert(`${t('GroupStats.GroupUpdateFormContainer.error')} \n ${deleteResponse?.statusText}`)
        return console.error(deleteResponse)
      } else {
        window.location.href = `/users/${login}/groups`
      }
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
      updateGroup({ groupId: group.id, data }, {
        optimisticData: { ...group, ...data },
        populateCache: true,
        revalidate: false,
        rollbackOnError: true
      })
      handleGroupModalActive()
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
  adminMode: bool,
  authUserId: string,
  children: node,
  group: shape({
    display_name: string,
    id: string,
    stats_visibility: string
  }),
  handleGroupModalActive: func,
  login: string
}

export default GroupUpdateFormContainer
