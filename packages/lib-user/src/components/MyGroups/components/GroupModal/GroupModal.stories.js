import { useState } from 'react'

import GroupModal from './GroupModal'

export default {
  title: 'components/MyGroups/GroupModal',
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
      <>
        {'Hello world!'}
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac risus id ante dapibus vestibulum. Donec id.</p>
      </>
    </GroupModal>
  ]
}
