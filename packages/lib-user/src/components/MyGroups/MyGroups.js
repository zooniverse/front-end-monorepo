'use client'

import { Grid } from 'grommet'
import { object } from 'prop-types'

import {
  usePanoptesMemberships,
  usePanoptesUser,
  useStats
} from '@hooks'

import { ContentBox } from '@components/shared'
import { Layout } from '@components/shared'

import { getActiveGroupsWithRoles } from './helpers/getActiveGroupsWithRoles'

const STATS_ENDPOINT = '/classifications/user_groups'

// the following GroupCard will be replaced with GroupCard component per PR 5943
function GroupCard({
  displayName = '',
  id = '',
  role = ''
}) {
  const { data, error, isLoading } = useStats({ endpoint: STATS_ENDPOINT, sourceId: id })

  const { total_count, time_spent, active_users, project_contributions } = data || {}

  return (
    <div>
      <h3>{displayName}</h3>
      <span>{role}</span>
      <div>
        <span>Classifications {total_count}</span>
        <span>Hours {Math.round(time_spent)}</span>
        <span>Members {active_users}</span>
        <span>Projects {project_contributions?.length}</span>
      </div>
    </div>
  )
}

function MyGroups({
  authClient
}) {
  const {
    data: user,
    error: userError,
    isLoading: userLoading
  } = usePanoptesUser(authClient)
  
  const {
    data: membershipsWithGroups,
    error: membershipsError,
    isLoading: membershipsLoading
  } = usePanoptesMemberships({
    authClient,
    query: {
      include: 'user_group',
      user_id: user?.id
    }
  })

  const activeGroupsWithRoles = getActiveGroupsWithRoles(membershipsWithGroups)

  return (
    <Layout>
      <ContentBox
        linkLabel='Learn more about Groups'
        linkProps={{ href: '/groups' }}
        title='My Groups'
        pad={{ horizontal: '60px', vertical: '30px' }}
      >
        {activeGroupsWithRoles.length === 0 ? (
          <p>You are not an active member of any groups.</p>
        ) : null}
        <Grid
          columns={{
            count: 2,
            size: 'auto'
          }}
          gap='small'
        >
          {activeGroupsWithRoles.map((group) => {
            return (
              <GroupCard
                key={group.id}
                displayName={group.display_name}
                id={group.id}
                role={group.roles}
              />
            )
          })}
        </Grid>
      </ContentBox>
    </Layout>
  )
}

MyGroups.propTypes = {
  authClient: object
}

export default MyGroups
