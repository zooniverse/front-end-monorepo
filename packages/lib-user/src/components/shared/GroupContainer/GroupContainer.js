'use client'

import { Notification } from 'grommet'
import { bool, node, shape, string } from 'prop-types'
import { Children, cloneElement, useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { useTranslation } from '../../../translations/i18n.js'

import {
  ContentBox,
  Layout
} from '@components/shared'

import {
  usePanoptesMemberships,
  usePanoptesUserGroup,
} from '@hooks'

import {
  createPanoptesMembership,
  deletePanoptesMembership
} from '@utils'

import DeactivatedGroup from './components/DeactivatedGroup'
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
  const { t } = useTranslation()
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
  // define user_group membership delete mutation
  const { trigger: deleteMembership, isMutating: deleteMembershipLoading } = useSWRMutation(membershipKey, deletePanoptesMembership)
  // extract user_group active membership
  const newGroupMembership = newGroupMembershipData?.memberships?.[0]
  const membership = newGroupMembership || membershipsData?.memberships?.[0]
  const activeMembership = membership?.state === 'active' ? membership : null
  const activeMembershipRole = activeMembership?.roles?.[0]
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
      !activeMembershipRole &&
      !membershipError &&
      !membershipLoading
    ) {
      createMembership()
    }
  }, [
    activeMembershipRole,
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
    if (joinToken && activeMembershipRole) {
      deleteJoinTokenParam()
    }
  }, [joinToken, activeMembershipRole])

  const status = getUserGroupStatus({
    authUserId: authUser?.id,
    createGroupMembershipError,
    createGroupMembershipLoading,
    group,
    groupError,
    groupLoading,
    joinToken,
    t
  })

  const activeMembershipDeactivatedGroup = activeMembershipRole && groupError?.status === 404

  return (
    <>
      {showJoinNotification && (
        <Notification
          message={t('GroupContainer.joined')}
          onClose={() => setShowJoinNotification(false)}
          status='normal'
          time={4000}
          toast
        />
      )}
      {activeMembershipDeactivatedGroup ? (
        <Layout>
          <ContentBox
            align='center'
            direction='column'
            justify='center'
            pad='large'
          >
            <DeactivatedGroup
              deleteMembership={deleteMembership}
              deleteMembershipLoading={deleteMembershipLoading}
              membershipId={activeMembership.id}
            />
          </ContentBox>
        </Layout>
      ) : status ? (
        <Layout>
          <ContentBox
            align='center'
            direction='column'
            justify='center'
            pad='large'
          >
            {status}
          </ContentBox>
        </Layout>
      ) : (
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
