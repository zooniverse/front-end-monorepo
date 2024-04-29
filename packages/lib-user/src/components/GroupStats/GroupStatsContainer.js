'use client'

import asyncStates from '@zooniverse/async-states'
import { Notification } from 'grommet'
import { object, string } from 'prop-types'
import { useEffect, useState } from 'react'

import {
  usePanoptesAuthUser,
  usePanoptesUserGroup,
} from '@hooks'

import {
  createPanoptesMembership,
  deletePanoptesUserGroup,
  getBearerToken,
  updatePanoptesUserGroup
} from '@utils'

import { getStatus } from './helpers/getStatus'
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

  useEffect(function handleJoinGroup() {
    async function createGroupMembership() {
      setJoinStatus(asyncStates.posting)
      try {
        await createPanoptesMembership({
          joinToken,
          groupId,
          userId: authUser.id
        })

        deleteJoinTokenParam()
        
        setJoinStatus(asyncStates.success)
      } catch (error) {
        console.error(error)
        setJoinStatus(asyncStates.error)
      }
    }

    if (joinToken && authUser && joinStatus === null) {
      createGroupMembership()
    }
  }, [authUser, groupId, joinStatus, joinToken, setJoinStatus])
  
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

  async function handleGroupUpdate(updates) {
    try {
      const requestHeaders = await getRequestHeaders()
      const updatedGroup = await updatePanoptesUserGroup({ data: updates, headers: requestHeaders })
      console.log('updatedGroup', updatedGroup)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  const status = getStatus({ authUser, group, groupError, groupLoading, joinStatus, joinToken})

  return (
    <>
      {(joinStatus === asyncStates.success) && (
        <Notification
          message='New Group Joined!'
          onClose={() => setJoinStatus(asyncStates.initialized)}
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
