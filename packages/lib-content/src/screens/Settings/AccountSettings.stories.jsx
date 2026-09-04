import AccountSettings from './AccountSettings'

export default {
  title: 'Other / Settings / Account Settings',
  component: AccountSettings
}

export const Default = {
  args: {
    user: {
      display_name: 'Zooniverse Test User',
      id: '1000',
      login: 'zootester'
    }
  }
}
