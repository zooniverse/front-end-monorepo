import UserHeader from './UserHeader'

export default {
  title: 'Project App / Screens / Project Collection / UserHeader',
  component: UserHeader
}

export const Default = {
  args: {
    collection: {
      links: {
        owner: {
          id: '123456',
          display_name: 'Lauren Dunnigan',
          login: 'laurendunnigan'
        }
      }
    },
    projectSlug: 'test-owner/test-project'
  }
}