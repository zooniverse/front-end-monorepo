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
    isLoggedIn: false,
    isOwner: false
  }
}

export const LoggedInNotOwner = {
  args: {
    isLoggedIn: true,
    isOwner: false
  }
}

export const LoggedInOwner = {
  args: {
    isLoggedIn: true,
    isOwner: true
  }
}
