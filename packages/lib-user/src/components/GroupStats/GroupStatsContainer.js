'use client'

import asyncStates from '@zooniverse/async-states'
import { Notification } from 'grommet'
import { bool, shape, string } from 'prop-types'
import { useEffect, useState } from 'react'

import {
  usePanoptesMemberships,
  usePanoptesUserGroup,
} from '@hooks'

import {
  createPanoptesMembership
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
  adminMode,
  authUser,
  groupId,
  joinToken
}) {
  const [joinStatus, setJoinStatus] = useState(null)
  const [showJoinNotification, setShowJoinNotification] = useState(false)

  // fetch user_group
  const {
    data: group,
    error: groupError,
    isLoading: groupLoading
  } = usePanoptesUserGroup({
    adminMode,
    authUserId: authUser?.id,
    groupId,
    joinStatus
  })

  // fetch user_group membership
  const {
    data: membershipsData,
    error: membershipsError,
    isLoading: membershipsLoading
  } = usePanoptesMemberships({
    authUserId: authUser?.id,
    joinStatus,
    query: {
      user_group_id: groupId,
      user_id: authUser?.id
    }
  })
  let membership = null
  let role = null
  if (membershipsData) {
    membership = membershipsData?.memberships?.[0].state === 'active' ? membershipsData?.memberships?.[0] : null
    role = membership?.roles?.[0]
  }
  
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

    if (authUser && role === undefined && joinToken && joinStatus === null) {
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
          adminMode={adminMode}
          authUser={authUser}
          group={group}
          membership={membership}
        />
      )}
    </>
  )
}

GroupStatsContainer.propTypes = {
  adminMode: bool,
  authUser: shape({
    id: string
  }),
  groupId: string,
  joinToken: string
}

export default GroupStatsContainer
