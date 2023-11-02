'use client'

import {
  usePanoptesMemberships,
  usePanoptesUser
} from '@hooks/index.js'

import {
  createPanoptesUserGroup,
  getBearerToken
} from '@utils/index.js'

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
    userID: user?.id,
    includeGroups: true
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

  if (activeGroupsWithRoles.length === 0) return (<p>You are not an active member of any groups.</p>)

  return (
    <div>
      <div>
        <h3>MyGroups</h3>        
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
