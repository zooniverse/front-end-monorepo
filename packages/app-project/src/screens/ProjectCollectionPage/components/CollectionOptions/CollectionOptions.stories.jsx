import CollectionOptions from './CollectionOptions'

export default {
  title: 'Project App / Screens / Project Collection / CollectionOptions',
  component: CollectionOptions,
  args: {
    onSettings: () => console.log('opening collection settings')
  }
}

export const LoggedOut = {
  args: {
    canEdit: false,
    isLoggedIn: false
  }
}

export const LoggedInNotOwner = {
  args: {
    canEdit: false,
    isLoggedIn: true
  }
}

export const LoggedInOwner = {
  args: {
    canEdit: true,
    isLoggedIn: true
  }
}
