'use client'

// This component is a work in progress. It is not intended to be imported as-is, but is currently being used for initial MyGroups local development.

import {
  usePanoptesUser,
  usePanoptesMemberships
} from '../../hooks'

import {
  createPanoptesUserGroup,
  getBearerToken
} from '../../utils'

import convertActiveGroupsWithRoles from './helpers/convertActiveGroupsWithRoles.js'

import CreateGroup from './CreateGroup.js'

function MyGroups({ authClient }) {
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

  async function handleGroupCreate(data) {
    try {
      const authorization = await getBearerToken(authClient)
      const newGroup = await createPanoptesUserGroup({ data, authorization })
      console.log('newGroup', newGroup)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  if (userError || membershipsError) return (<p>Error: {userError?.toString() || membershipsError?.toString()}</p>)

  if (userLoading || membershipsLoading) return (<p>Loading...</p>)

  const activeGroupsWithRoles = convertActiveGroupsWithRoles(membershipsWithGroups)

  return (
    <div>
      <div>
        <h3>MyGroups</h3>
        {activeGroupsWithRoles.length === 0 ? (
          <p>You are not an active member of any groups.</p>
        ) : null}
        {activeGroupsWithRoles.map((group) => {
          const roles = group.roles

          return (
            <div key={group.id}>
              <h4><a href={`./?groups=${group.id}`}>{group.display_name}</a></h4>
              <span>{roles}</span>
              <div>
                <span>Classifications X</span>
                {' | '}
                <span>Hours Y</span>
                {' | '}
                <span>Members Z</span>
                {' | '}
                <span>Projects W</span>
              </div>
              <hr />
            </div>
          )
        })}
      </div>
      <CreateGroup
        handleGroupCreate={handleGroupCreate}
      />
    </div>
  )
}

export default MyGroups
