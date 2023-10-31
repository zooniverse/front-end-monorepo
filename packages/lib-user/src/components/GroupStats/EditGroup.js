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
  const [status, setStatus] = useState('initialized')

  useEffect(() => {
    setDisplayName(group?.display_name || '')
  }, [group])

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('submitting')

    const groupDisplayName = event.target.elements['group-name'].value
    // remove spaces from display_name per panoptes
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
      setStatus('success')
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  return (
    <div>
      <h3>Update group</h3>
      <div>
        Status: {status}
      </div>
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
          {/* <label htmlFor="group-stats-visibility">Group stats_visibility</label>
          <select id="group-stats-visibility" defaultValue={group.stats_visibility}>
            <option value="private_agg_only">private_agg_only</option>
            <option value="private_show_agg_and_ind">private_show_agg_and_ind</option>
            <option value="public_agg_only">public_agg_only</option>
            <option value="public_agg_show_ind_if_member">public_agg_show_ind_if_member</option>
            <option value="public_show_all">public_show_all</option>
          </select>
          <br /> */}
          <button type="submit">Update group</button>
        </form>
      </div>
    </div>
  )
}

export default EditGroup
