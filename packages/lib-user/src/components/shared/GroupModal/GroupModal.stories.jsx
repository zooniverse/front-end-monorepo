import { useState } from 'react'

import { GROUP_ADMIN_USER, MEMBERSHIPS, USER_GROUPS, USERS } from '../../../../test/mocks/panoptes'

import GroupCreateFormContainer from '../../MyGroups/components/GroupCreateFormContainer'
import GroupUpdateFormContainer from '../../GroupStats/components/GroupUpdateFormContainer'
import MembersList from '../../GroupStats/components/MembersList/MembersList'

import GroupModal from './GroupModal'

export default {
  title: 'components/shared/GroupModal',
  component: GroupModal
}

export function CreateGroup() {
  const [groupModalActive, setGroupModalActive] = useState(true)

  return [
    <button
      key='1-create-group-story'
      onClick={() => setGroupModalActive(true)}
    >
      Create New Group
    </button>,
    <GroupModal
      key='2-create-group-story'
      active={groupModalActive}
      handleClose={() => setGroupModalActive(false)}
      title='create new group'
      titleColor='black'
    >
      <GroupCreateFormContainer />
    </GroupModal>
  ]
}

export function ManageGroup() {
  const [groupModalActive, setGroupModalActive] = useState(true)

  return [
    <button
      key='1-manage-group-story'
      onClick={() => setGroupModalActive(true)}
    >
      Edit Group
    </button>,
    <GroupModal
      key='2-manage-group-story'
      active={groupModalActive}
      handleClose={() => setGroupModalActive(false)}
      title='manage group'
      titleColor='black'
    >
      <GroupUpdateFormContainer
        group={USER_GROUPS[0]}
        login='test-user'
      >
        <MembersList
          authUserId={GROUP_ADMIN_USER.id}
          memberships={MEMBERSHIPS}
          users={USERS}
        />
      </GroupUpdateFormContainer>
    </GroupModal>
  ]
}

export function ManageGroupWithMembersPagination() {
  const [groupModalActive, setGroupModalActive] = useState(true)

  return [
    <button
      key='1-manage-group-story'
      onClick={() => setGroupModalActive(true)}
    >
      Edit Group
    </button>,
    <GroupModal
      key='2-manage-group-story'
      active={groupModalActive}
      handleClose={() => setGroupModalActive(false)}
      title='manage group'
      titleColor='black'
    >
      <GroupUpdateFormContainer
        group={USER_GROUPS[0]}
        login='test-user'
      >
        <MembersList
          authUserId={GROUP_ADMIN_USER.id}
          memberships={MEMBERSHIPS}
          paginationProps={{
            numberItems: 100,
            onChange: () => true,
            page: 1,
            step: 20
          }}
          users={USERS}
        />
      </GroupUpdateFormContainer>
    </GroupModal>
  ]
}
