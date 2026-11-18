import { useState } from 'react'

import CollectionSettingsModal from './CollectionSettingsModal'

const collection = {
  description: 'Collection or favorites description here. This is an area where volunteers can describe the relationship between the subjects they have chosen. Collection or favorites description here. A place where volunteers can describe the relationship between the subjects they have chosen.',
  display_name: 'Silly Animals Being Silly',
  private: false
}

const collaborators = [
  { id: '1', display_name: 'Viewer 1', login: 'userviewer1', role: 'viewer' },
  { id: '2', display_name: 'Contributor 1', login: 'usercontributor1', role: 'contributor' },
  { id: '3', display_name: 'Collaborator 1', login: 'usercollaborator1', role: 'collaborator' }
]

function SettingsStory({ collaborators: initialCollaborators, ...args }) {
  const [currentCollection, setCurrentCollection] = useState(args.collection)
  const [currentCollaborators, setCurrentCollaborators] = useState(initialCollaborators)

  function handleRoleChange(id, role) {
    setCurrentCollaborators(previous => previous.map(collaborator => (
      collaborator.id === id ? { ...collaborator, role } : collaborator
    )))
  }

  function handleRemove(id) {
    setCurrentCollaborators(previous => previous.filter(collaborator => collaborator.id !== id))
  }

  function handleSubmit(value) {
    setCurrentCollection(value)
  }

  return (
    <CollectionSettingsModal
      {...args}
      active
      collection={currentCollection}
      collaborators={currentCollaborators}
      onClose={() => true}
      onDelete={() => true}
      onRemoveCollaborator={handleRemove}
      onRoleChange={handleRoleChange}
      onSubmit={handleSubmit}
    />
  )
}

export default {
  title: 'Project App / Screens / Project Collection / CollectionSettingsModal',
  component: CollectionSettingsModal,
  render: args => <SettingsStory {...args} />,
  args: {
    collection,
    collectionUrl: '/collections/laurendunnigan/silly-animals-being-silly',
    collaborators: []
  }
}

export const NoCollaborators = {}

export const WithCollaborators = {
  args: { collaborators }
}

export const PrivateCollection = {
  args: {
    collection: { ...collection, private: true },
    collaborators
  }
}
