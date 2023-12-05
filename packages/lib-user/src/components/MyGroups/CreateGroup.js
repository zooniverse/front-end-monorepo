// This component is a work in progress. It will be refactored with tests, with a storybook, and in accordance with the related design. It is currently being used for initial local development.

function CreateGroup({ handleGroupCreate }) {
  function handleSubmit(event) {
    event.preventDefault()

    const groupDisplayName = event.target.elements['group-name'].value
    // per panoptes requirement that name has no spaces,
    // remove spaces from display_name:
    const groupName = groupDisplayName.replace(/\s+/g, '')
    
    const data = {
      display_name: groupDisplayName,
      name: groupName
    }

    handleGroupCreate(data)
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
