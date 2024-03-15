'use client'

import { Grid } from 'grommet'
import { object } from 'prop-types'

import {
  usePanoptesMemberships,
  usePanoptesUser
} from '@hooks'

import { ContentBox } from '@components/shared'
import { Layout } from '@components/shared'

import GroupCard from './components/GroupCard'
import { getActiveGroupsWithRoles } from './helpers/getActiveGroupsWithRoles'

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
  authClient: object
}

export default MyGroups
