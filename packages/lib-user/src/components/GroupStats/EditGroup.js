import { useEffect, useState } from 'react'

function EditGroup({ group, handleGroupUpdate }) {
  const [displayName, setDisplayName] = useState('')

  useEffect(() => {
    setDisplayName(group?.display_name || '')
  }, [group])

  function handleSubmit(event) {
    event.preventDefault()

    const groupDisplayName = event.target.elements['group-name'].value
    // per panoptes requirement that name has no spaces,
    // remove spaces from display_name:
    const groupName = groupDisplayName.replace(/\s+/g, '')

    const updates = {
      id: group?.id,
      display_name: groupDisplayName,
      name: groupName
    }

    handleGroupUpdate(updates)
  }

  return (
    <div>
      <h3>Update group</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="group-name">Group display_name</label>
          <input
            id="group-name"
            onChange={(event) => setDisplayName(event.target.value)}
            value={displayName}
            type="text"
          />
          <br />
          <button type="submit">Update group</button>
        </form>
      </div>
    </div>
  )
}

export default EditGroup
