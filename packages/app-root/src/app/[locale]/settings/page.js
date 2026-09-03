import UserSettingsContainer from './UserSettingsContainer'

export const metadata = {
  title: 'Settings',
  description: ''
}

export default async function SettingsPage () {
  return (
    <UserSettingsContainer
      subPageComponent={undefined}
    />
  )
}
