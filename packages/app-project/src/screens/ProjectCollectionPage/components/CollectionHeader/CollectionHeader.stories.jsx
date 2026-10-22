import CollectionHeader from './CollectionHeader'

export default {
  title: 'Project App / Screens / Project Collection / CollectionHeader',
  component: CollectionHeader
}

const collection = {
  display_name: 'Silly Animals Being Silly'
}

const projectProps = {
  projectDisplayName: 'Elephant ID',
  projectSlug: 'test-owner/elephant-id'
}

export const Viewer = {
  args: {
    collection,
    collectionRole: 'viewer',
    ...projectProps
  }
}

export const Owner = {
  args: {
    collection,
    collectionRole: 'owner',
    ...projectProps
  }
}

export const Collaborator = {
  args: {
    collection,
    collectionRole: 'collaborator',
    ...projectProps
  }
}

export const Contributor = {
  args: {
    collection,
    collectionRole: 'contributor',
    ...projectProps
  }
}