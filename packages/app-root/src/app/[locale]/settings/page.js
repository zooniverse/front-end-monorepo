import AccountSettingsContainer from './AccountSettingsContainer'

export const metadata = {
  title: 'Settings',
  description: ''
}

export default async function SettingsPage () {
  return (
    <AccountSettingsContainer
      subPageComponent={undefined}
    />
  )
}
