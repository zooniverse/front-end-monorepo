import AllProjectsContainer from './AllProjectsContainer.js'

export const metadata = {
  title: 'User Stats All Projects',
  description: 'My Zooniverse user projects page'
}

export default async function UserStatAllProjectsPage(props) {
  const params = await props.params
  const searchParams = await props.searchParams

  return <AllProjectsContainer login={params.login} searchParams={searchParams} />
}
