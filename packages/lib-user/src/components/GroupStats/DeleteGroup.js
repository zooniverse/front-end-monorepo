// This component is a work in progress. It will be refactored with tests, with a storybook, and in accordance with the related design. It is currently being used for initial local development.

import {
  deletePanoptesUserGroup
} from '@utils'

function DeleteGroup({ groupId }) {
  async function handleGroupDelete({ groupId }) {
    try {
      const deleteResponse = await deletePanoptesUserGroup({ groupId })
      console.log('deleteResponse', deleteResponse)
      // window.location.href = `https://www.zooniverse.org/users/${authUser?.login}`
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <div>
      <button
        onClick={(event) => {
          event.preventDefault()
          if (window.confirm('Are you sure you want to delete this group?')) {
            handleGroupDelete({ groupId })
          }
        }}
      >
        Delete group
      </button>
    </div>
  )
}

export default DeleteGroup
