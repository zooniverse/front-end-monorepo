'use client'

import { Grid } from 'grommet'
import { arrayOf, object, shape, string } from 'prop-types'

import { ContentBox } from '@components/shared'
import { Layout } from '@components/shared'

import { getActiveGroupsWithRoles } from './helpers/getActiveGroupsWithRoles'
import GroupCard from './components/GroupCard'

function MyGroups({
  authClient = {},
  authUserId = '',
  membershipsWithGroups = []
}) {
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
          gap={{ row: '20px', column: '40px' }}
        >
          {activeGroupsWithRoles.map((group) => {
            return (
              <GroupCard
                key={group.id}
                authClient={authClient}
                authUserId={authUserId}
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
  authUserId: string,
  membershipsWithGroups: shape({
    body: shape({
      user_groups: arrayOf(shape({
        id: string,
        roles: arrayOf(string)
      }))
    })
  })
}

export default MyGroups
