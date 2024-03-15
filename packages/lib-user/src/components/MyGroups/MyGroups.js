'use client'

import { Grid } from 'grommet'
import { object } from 'prop-types'

import {
  usePanoptesMemberships,
  usePanoptesUser
} from '@hooks'

import { ContentBox } from '@components/shared'
import { Layout } from '@components/shared'

import { getActiveGroupsWithRoles } from './helpers/getActiveGroupsWithRoles'
import GroupCard from './components/GroupCard'

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
    },
    userId: user?.id
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
                authClient={authClient}
                displayName={group.display_name}
                id={group.id}
                role={group.roles[0]}
                userId={user?.id}
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
