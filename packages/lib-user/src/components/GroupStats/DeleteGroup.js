// This component is a work in progress. It will be refactored with tests, with a storybook, and in accordance with the related design. It is currently being used for initial local development.

function DeleteGroup({ handleGroupDelete }) {
  function handleClick(event) {
    event.preventDefault()
    
    const confirmDelete = window.confirm('Are you sure you want to delete this group?')

    if (confirmDelete) {
      handleGroupDelete()
    }

    return null
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
