'use client'

import { Grid } from 'grommet'
import { object, string } from 'prop-types'

import {
  usePanoptesAuthUser,
  usePanoptesMemberships,
  usePanoptesUser
} from '@hooks'

import { ContentBox } from '@components/shared'
import { Layout } from '@components/shared'

import { getActiveGroupsWithRoles } from './helpers/getActiveGroupsWithRoles'
import GroupCard from './components/GroupCard'

function MyGroups({
  authClient,
  login
}) {
  const {
    data: authUser
  } = usePanoptesAuthUser(authClient)

  const {
    data: user,
    error: userError,
    isLoading: userLoading
  } = usePanoptesUser({
    authClient,
    authUser,
    authUserId: authUser?.id,
    login
  })
  
  const {
    data: membershipsWithGroups,
    error: membershipsError,
    isLoading: membershipsLoading
  } = usePanoptesMemberships({
    authClient,
    authUserId: authUser?.id,
    query: {
      include: 'user_group',
      user_id: user?.id
    },
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
                authUserId={authUser?.id}
                displayName={group.display_name}
                id={group.id}
                role={group.roles[0]}
              />
            )
          })}
        </Grid>
      </ContentBox>
    </Layout>
  )
}

MyGroups.propTypes = {
  authClient: object,
  login: string
}

export default MyGroups
