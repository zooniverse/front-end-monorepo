'use client'

import { Notification } from 'grommet'
import { bool, node, shape, string } from 'prop-types'
import { Children, cloneElement, useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'

import {
  usePanoptesMemberships,
  usePanoptesUserGroup,
} from '@hooks'

import {
  createPanoptesMembership
} from '@utils'

import { getUserGroupStatus } from './helpers/getUserGroupStatus'

function deleteJoinTokenParam() {
  let url = new URL(window.location.href)
  let params = new URLSearchParams(url.search)
  params.delete('join_token')
  url.search = params.toString()
  window.history.pushState({}, '', url.toString())
}

function GroupContainer({
  adminMode,
  authUser,
  children,
  groupId,
  joinToken
}) {
  const [showJoinNotification, setShowJoinNotification] = useState(false)

  // define user_group membership key
  const membershipKey = {
    authUserId: authUser?.id,
    query: {
      user_group_id: groupId,
      user_id: authUser?.id
    }
  }
  // fetch user_group membership
  const {
    data: membershipsData,
    error: membershipsDataError,
    isLoading: membershipsDataLoading
  } = usePanoptesMemberships(membershipKey)
  // define user_group membership create mutation
  const {
    data: newGroupMembershipData,
    error: createGroupMembershipError,
    isMutating: createGroupMembershipLoading,
    trigger: createGroupMembership
  } = useSWRMutation(membershipKey, createPanoptesMembership)
  // extract user_group active membership
  const newGroupMembership = newGroupMembershipData?.memberships?.[0]
  const membership = newGroupMembership || membershipsData?.memberships?.[0]
  const activeMembership = membership?.state === 'active' ? membership : null
  const membershipError = membershipsDataError || createGroupMembershipError
  const membershipLoading = membershipsDataLoading || createGroupMembershipLoading

  // fetch user_group
  const {
    data: group,
    error: groupError,
    isLoading: groupLoading
  } = usePanoptesUserGroup({
    adminMode,
    authUserId: authUser?.id,
    groupId,
    membershipId: activeMembership?.id
  })
  
  useEffect(function handleJoinGroup() {
    async function createMembership() {
      try {
        await createGroupMembership({ groupId, joinToken, userId: authUser.id }, {
          populateCache: true,
          revalidate: false,
          throwOnError: false
        })
      } catch (error) {
        console.error(error)
      }
    }

    if (
      authUser?.id && 
      joinToken &&
      !activeMembership &&
      !membershipError &&
      !membershipLoading
    ) {
      createMembership()
    }
  }, [
    activeMembership,
    authUser,
    groupId,
    joinToken,
    membershipError,
    membershipLoading
  ])

  useEffect(function handleJoinSuccessNotification() {
    if (newGroupMembership?.id) {
      setShowJoinNotification(true)
      deleteJoinTokenParam()
    }
  }, [newGroupMembership])

  useEffect(function handleExistingMemberWithJoinToken() {
    if (joinToken && activeMembership?.role) {
      deleteJoinTokenParam()
    }
  }, [joinToken, activeMembership])

  const status = getUserGroupStatus({ 
    authUserId: authUser?.id,
    createGroupMembershipError,
    createGroupMembershipLoading,
    group,
    groupError,
    groupLoading,
    joinToken
  })

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
        Children.map(children, child => 
          cloneElement(
            child,
            {
              adminMode,
              authUser,
              group,
              membership: activeMembership,
            }
          )
        )
      )}
    </>
  )
}

GroupContainer.propTypes = {
  adminMode: bool,
  authUser: shape({
    id: string
  }),
  children: node.isRequired,
  groupId: string,
  joinToken: string
}

export default GroupContainer
