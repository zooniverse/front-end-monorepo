import AllProjectsContainer from './AllProjectsContainer.js'

export const metadata = {
  title: 'User Stats All Projects',
  description: 'My Zooniverse projects user stats page'
}

export default function UserStatAllProjectsPage({ params }) {
  return <AllProjectsContainer login={params.login} />
}
