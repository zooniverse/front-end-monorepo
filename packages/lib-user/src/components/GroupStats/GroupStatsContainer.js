'use client'

import asyncStates from '@zooniverse/async-states'
import { Notification } from 'grommet'
import { object, string } from 'prop-types'
import { useEffect, useState } from 'react'

import {
  usePanoptesAuthUser,
  usePanoptesMemberships,
  usePanoptesUserGroup,
} from '@hooks'

import {
  createPanoptesMembership,
  deletePanoptesUserGroup,
  getBearerToken,
  updatePanoptesUserGroup
} from '@utils'

import { getUserGroupStatus } from './helpers/getUserGroupStatus'
import GroupStats from './GroupStats'

function deleteJoinTokenParam() {
  let url = new URL(window.location.href)
  let params = new URLSearchParams(url.search)
  params.delete('join_token')
  url.search = params.toString()
  window.history.pushState({}, '', url.toString())
}

function GroupStatsContainer({
  authClient,
  groupId,
  joinToken
}) {
  const [joinStatus, setJoinStatus] = useState(null)
  const [showJoinNotification, setShowJoinNotification] = useState(false)

  // fetch authenticated user
  const {
    data: authUser
  } = usePanoptesAuthUser(authClient)

  // fetch user_group
  const {
    data,
    error: groupError,
    isLoading: groupLoading
  } = usePanoptesUserGroup({
    authClient,
    authUserId: authUser?.id,
    groupId,
    joinStatus
  })
  const group = data?.body?.user_groups?.[0]

  // fetch user_group membership
  const {
    data: membershipsData,
    error: membershipsError,
    isLoading: membershipsLoading
  } = usePanoptesMemberships({
    authClient,
    authUserId: authUser?.id,
    joinStatus,
    query: {
      user_group_id: groupId,
      user_id: authUser?.id
    }
  })
  const role = membershipsData?.memberships?.[0]?.roles?.[0]
  
  useEffect(function handleJoinGroup() {
    async function createGroupMembership() {
      try {
        await createPanoptesMembership({
          groupId,
          joinToken,
          userId: authUser.id
        })

        deleteJoinTokenParam()
        
        setJoinStatus(asyncStates.success)
        setShowJoinNotification(true)
      } catch (error) {
        console.error(error)
        setJoinStatus(asyncStates.error)
      }
    }

    if (authUser && !role && joinToken && joinStatus === null) {
      setJoinStatus(asyncStates.posting)
      createGroupMembership()
    }

    if (role && joinToken) {
      deleteJoinTokenParam()
    }
  }, [
    authUser,
    groupId,
    joinStatus,
    joinToken,
    role
  ])
  
  async function getRequestHeaders() {
    const authorization = await getBearerToken(authClient)
    const requestHeaders = {
      authorization,
      etag: data.headers.etag
    }
    return requestHeaders
  }

  async function handleGroupDelete() {
    try {
      const requestHeaders = await getRequestHeaders()
      const deleteResponse = await deletePanoptesUserGroup({ groupId, headers: requestHeaders })
      console.log('deleteResponse', deleteResponse)
      window.location.href =  '?users=[login]/groups'
    } catch (error) {
      console.error(error)
    }
  }

  async function handleGroupUpdate(data) {
    try {
      const requestHeaders = await getRequestHeaders()
      const updatedGroup = await updatePanoptesUserGroup({ data, headers: requestHeaders, id: groupId })
      console.log('updatedGroup', updatedGroup)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }
   
  const status = getUserGroupStatus({ authUser, group, groupError, groupLoading, joinStatus, joinToken })

  return (
    <>
      {showJoinNotification && (
        <Notification
          message='New Group Joined!'
          onClose={() => setShowJoinNotification(false)}
          status='normal'
          time={4000}
          toast
        />
      )}
      {status ? (<div>{status}</div>) : (
        <GroupStats
          authClient={authClient}
          authUser={authUser}
          group={group}
          handleGroupDelete={handleGroupDelete}
          handleGroupUpdate={handleGroupUpdate}
          login={authUser?.login}
        />
      )}
    </>
  )
}

GroupStatsContainer.propTypes = {
  authClient: object,
  groupId: string,
  joinToken: string
}

export default GroupStatsContainer
