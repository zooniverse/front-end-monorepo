// This component is a work in progress. It will be refactored with tests, with a storybook, and in accordance with the related design. It is currently being used for initial local development.

import { useEffect, useState } from 'react'

function EditGroup({ group, handleGroupUpdate }) {
  const [displayName, setDisplayName] = useState('')
  const [statsVisibility, setStatsVisibility] = useState('')

  useEffect(() => {
    setDisplayName(group?.display_name || '')
    setStatsVisibility(group?.stats_visibility || '')
  }, [group])

  function handleSubmit(event) {
    event.preventDefault()

    const groupDisplayName = event.target.elements['group-name'].value
    const groupStatsVisibility = event.target.elements['group-stats_visibility'].value

    const updates = {
      id: group?.id,
      display_name: groupDisplayName,
      stats_visibility: groupStatsVisibility
    }

    handleGroupUpdate(updates)
  }

  return (
    <div>
      <h3>Update group</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='group-name'>Group display_name</label>
          <input
            id='group-name'
            name='group-name'
            onChange={event => setDisplayName(event.target.value)}
            type='text'
            value={displayName}
          />
          <br />
          <label htmlFor='group-stats_visibility'>Group stats_visibility</label>
          <select
            id='group-stats_visibility'
            name='group-stats_visibility'
            onChange={event => setStatsVisibility(event.target.value)}
            type='select'
            value={statsVisibility}
          >
            <option value='private_agg_only'>private_agg_only</option>
            <option value='private_show_agg_and_ind'>private_show_agg_and_ind</option>
            <option value='public_agg_only'>public_agg_only</option>
            <option value='public_agg_show_ind_if_member'>public_agg_show_ind_if_member</option>
            <option value='public_show_all'>public_show_all</option>
          </select>
          <br />
          <button type='submit'>Update group</button>
        </form>
      </div>
    </div>
  )
}

export default EditGroup
