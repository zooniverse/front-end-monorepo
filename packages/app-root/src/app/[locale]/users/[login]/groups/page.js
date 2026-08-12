import MyGroupsContainer from './MyGroupsContainer'

export const metadata = {
  title: 'My Groups',
  description: 'My Zooniverse groups page'
}

export default async function MyGroupsPage(props) {
  const params = await props.params

  return (
    <MyGroupsContainer
      login={params.login}
    />
  )
}
