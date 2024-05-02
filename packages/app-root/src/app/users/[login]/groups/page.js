import MyGroupsContainer from './MyGroupsContainer'

export const metadata = {
  title: 'My Groups',
  description: 'My Zooniverse groups page'
}

export default function MyGroupsPage({ params }) {
  return (
    <MyGroupsContainer
      login={params.login}
    />
  )
}
