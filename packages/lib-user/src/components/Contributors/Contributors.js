import { arrayOf, bool, shape, string } from 'prop-types'

import {
  usePanoptesProjects,
  usePanoptesUser,
  useStats
} from '@hooks'

import {
  ContentBox,
  HeaderLink,
  Layout
} from '@components/shared'

import ContributorsList from './components/ContributorsList'
import { Header } from 'grommet'

const STATS_ENDPOINT = '/classifications/user_groups'

function Contributors({
  adminMode,
  authUser,
  group,
  membership
}) {
  const showContributors = adminMode 
    || membership?.roles.includes('group_admin')
    || (membership?.roles.includes('group_member') && group?.stats_visibility === 'private_show_agg_and_ind')
    || (membership?.roles.includes('group_member') && group?.stats_visibility === 'public_agg_show_ind_if_member')
    || group?.stats_visibility === 'public_show_all'
  if (!showContributors) return (<div>Not authorized</div>)

  // fetch stats
  const statsQuery = {
    individual_stats_breakdown: true,
  }
  
  const {
    data: stats,
    error: statsError,
    isLoading: statsLoading
  } = useStats({
    authUserId: authUser?.id,
    endpoint: STATS_ENDPOINT,
    sourceId: group?.id,
    query: statsQuery
  })

  // fetch users
  const userIds = stats?.group_member_stats_breakdown?.map(member => member.user_id)
  
  const {
    data: users,
    error: usersError,
    isLoading: usersLoading
  } = usePanoptesUser({
    authUser,
    userIds
  })
  
  // fetch projects
  const arrayOfProjectContributionArrays = stats?.group_member_stats_breakdown?.map(member => member.project_contributions)
  const flattenedProjectContributionArray = arrayOfProjectContributionArrays?.flat()
  const projectIds = [...new Set(flattenedProjectContributionArray?.map(item => item.project_id))]

  const {
    data: projects,
    error: projectsError,
    isLoading: projectsLoading
  } = usePanoptesProjects(projectIds)

  let contributors = []
  if (stats && users && projects) {
    contributors = stats?.group_member_stats_breakdown?.map(member => {
      const user = users?.find(user => user.id === member.user_id.toString())
      return {
        ...member,
        ...user
      }
    })
  }

  return (
    <Layout
      primaryHeaderItem={
        <HeaderLink
          href={`/groups/${group.id}`}
          label='back'
          primaryItem={true}
        />
      }
    >
      <ContentBox
        title='Full Group Stats'
      >
        {contributors.length > 0 ? (
            <ContributorsList
              contributors={contributors}
              projects={projects}
            />
          ) : <div>Loading...</div>
        }
      </ContentBox>
    </Layout>
  )
}

Contributors.propTypes = {
  adminMode: bool,
  authUser: shape({
    id: string
  }),
  group: shape({
    display_name: string,
    id: string
  }),
  membership: shape({
    id: string,
    roles: arrayOf(string)
  })
}

export default Contributors
