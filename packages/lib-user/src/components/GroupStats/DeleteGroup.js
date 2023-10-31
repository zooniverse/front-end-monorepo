import { panoptes } from '@zooniverse/panoptes-js'

import { getBearerToken } from '@utils/index.js'

async function deletePanoptesGroup(groupID, headers) {
  if (headers?.authorization) {
    const response = await panoptes.del(`/user_groups/${groupID}`, {}, headers)
    return response
  }

  return null
}

function DeleteGroup({ authClient, groupID, headers }) {
  async function handleClick(event) {
    event.preventDefault()
    
    try {
      const authorization = await getBearerToken(authClient)
      const newHeaders = {
        authorization,
        etag: headers.etag
      }
      
      const deleteResponse = await deletePanoptesGroup(groupID, newHeaders)
      console.log('deleteResponse', deleteResponse)
      window.location.href =  '?users=[login]/groups'
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <button
      onClick={handleClick}
    >
      Delete group
    </button>
  )
}

export default DeleteGroup
