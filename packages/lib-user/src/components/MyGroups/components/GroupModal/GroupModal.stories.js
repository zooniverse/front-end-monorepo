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
      Create Group
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
        <p>Lorem ipsum dolor sit amet, consectetur adipisic. Lorem ipsum dolor sit amet, consectetur adipisic. Lorem ipsum dolor sit amet, consectetur adipisic.</p>
      </>
    </GroupModal>
  ]
}
