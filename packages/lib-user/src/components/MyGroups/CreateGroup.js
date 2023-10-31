import { useState } from 'react'
import { panoptes } from '@zooniverse/panoptes-js'

import { getBearerToken } from '@utils/index.js'

const DEFAULT_USER_GROUP = {
  display_name: '',
  name: '',
  // stats_visibility: 'private_agg_only'
}

async function createPanoptesGroup(data = DEFAULT_USER_GROUP, authorization) {
  if (authorization) {
    const response = await panoptes.post('/user_groups', { user_groups: data }, { authorization })
    return response
  }

  return null
}

function CreateGroup({ authClient }) {
  const [status, setStatus] = useState('initialized')

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('submitting')

    const groupDisplayName = event.target.elements['group-name'].value
    // per panoptes requirement that name has no spaces,
    // remove spaces from display_name:
    const groupName = groupDisplayName.replace(/\s+/g, '')
    // const statsVisibility = event.target.elements['group-stats-visibility'].value
    const data = {
      display_name: groupDisplayName,
      name: groupName,
      // stats_visibility: statsVisibility
    }
    
    try {
      const authorization = await getBearerToken(authClient)
      const newGroup = await createPanoptesGroup(data, authorization)
      console.log('newGroup', newGroup)
      setStatus('success')
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  return (
    <div>
      <h3>Create new group</h3>
      <div>
        Status: {status}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="group-name">Group display_name</label>
          <input type="text" id="group-name" />
          <br />
          {/* <label htmlFor="group-stats-visibility">Group stats_visibility</label>
          <select id="group-stats-visibility" defaultValue={'private_agg_only'}>
            <option value="private_agg_only">private_agg_only</option>
            <option value="private_show_agg_and_ind">private_show_agg_and_ind</option>
            <option value="public_agg_only">public_agg_only</option>
            <option value="public_agg_show_ind_if_member">public_agg_show_ind_if_member</option>
            <option value="public_show_all">public_show_all</option>
          </select>
          <br /> */}
          <button type="submit">Create group</button>
        </form>
      </div>
    </div>
  )
}

export default CreateGroup
