import { useEffect, useState } from 'react'
import { panoptes } from '@zooniverse/panoptes-js'

import { getBearerToken } from '@utils/index.js'

const DEFAULT_USER_GROUP = {
  display_name: '',
  name: ''
}

async function updatePanoptesGroup(data = DEFAULT_USER_GROUP, headers) {
  if (headers?.authorization) {
    const response = await panoptes
      .put(`/user_groups/${data.id}`,
        {
          user_groups: {
            display_name: data.display_name,
            name: data.name
          }
        },
        headers
      )
    return response
  }

  return null
}

function EditGroup({ authClient, group, headers }) {
  const [displayName, setDisplayName] = useState('')

  useEffect(() => {
    setDisplayName(group?.display_name || '')
  }, [group])

  async function handleSubmit(event) {
    event.preventDefault()

    const groupDisplayName = event.target.elements['group-name'].value
    // per panoptes requirement that name has no spaces,
    // remove spaces from display_name:
    const groupName = groupDisplayName.replace(/\s+/g, '')
    
    const data = {
      id: group?.id,
      display_name: groupDisplayName,
      name: groupName
    }
    
    try {
      const authorization = await getBearerToken(authClient)
      const newHeaders = {
        authorization,
        etag: headers.etag
      }
      
      const updatedGroup = await updatePanoptesGroup(data, newHeaders)
      console.log('updatedGroup', updatedGroup)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
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
