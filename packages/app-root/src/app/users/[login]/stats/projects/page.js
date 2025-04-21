import AllProjectsContainer from './AllProjectsContainer.js'

export const metadata = {
  title: 'User Stats All Projects',
  description: 'My Zooniverse user projects page'
}

export default function UserStatAllProjectsPage({ params, searchParams }) {
  return <AllProjectsContainer login={params.login} searchParams={searchParams} />
}
