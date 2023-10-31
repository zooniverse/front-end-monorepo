import { panoptes } from '@zooniverse/panoptes-js'

import { getBearerToken } from '@utils/index.js'

const DEFAULT_USER_GROUP = {
  display_name: '',
  name: ''
}

async function createPanoptesGroup(data = DEFAULT_USER_GROUP, authorization) {
  if (authorization) {
    const response = await panoptes.post('/user_groups', { user_groups: data }, { authorization })
    return response
  }

  return null
}

function CreateGroup({ authClient }) {
  async function handleSubmit(event) {
    event.preventDefault()

    const groupDisplayName = event.target.elements['group-name'].value
    // per panoptes requirement that name has no spaces,
    // remove spaces from display_name:
    const groupName = groupDisplayName.replace(/\s+/g, '')
    
    const data = {
      display_name: groupDisplayName,
      name: groupName
    }
    
    try {
      const authorization = await getBearerToken(authClient)
      const newGroup = await createPanoptesGroup(data, authorization)
      console.log('newGroup', newGroup)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h3>Create new group</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="group-name">Group display_name</label>
          <input type="text" id="group-name" />
          <br />
          <button type="submit">Create group</button>
        </form>
      </div>
    </div>
  )
}

export default CreateGroup
