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
