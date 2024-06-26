'use client'

import { bool, shape, string } from 'prop-types'
import { useState } from 'react'

import {
  usePanoptesMemberships,
  usePanoptesUser
} from '@hooks'

import {
  ContentBox,
  GroupModal,
  HeaderLink,
  Layout
} from '@components/shared'

import { getActiveGroupsWithRoles } from './helpers/getActiveGroupsWithRoles'

import MyGroups from './MyGroups'
import CreateButton from './components/CreateButton'
import GroupCardList from './components/GroupCardList'
import GroupCreateFormContainer from './components/GroupCreateFormContainer'
import PreviewLayout from './components/PreviewLayout'

function MyGroupsContainer({ authUser, login, previewLayout = false }) {
  const [groupModalActive, setGroupModalActive] = useState(false)

  const {
    data: user,
    error: userError,
    isLoading: userLoading
  } = usePanoptesUser({
    authUser,
    login
  })

  const {
    data: membershipsWithGroups,
    error: membershipsError,
    isLoading: membershipsLoading
  } = usePanoptesMemberships({
    authUserId: authUser?.id,
    query: {
      include: 'user_group',
      user_id: user?.id
    }
  })

  const activeGroupsWithRoles = getActiveGroupsWithRoles(membershipsWithGroups)
  const groupsSortedByCreatedAt = activeGroupsWithRoles.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

  return (
    <>
      <GroupModal
        active={groupModalActive}
        handleClose={() => setGroupModalActive(false)}
        title='create new group'
        titleColor='black'
      >
        <GroupCreateFormContainer />
      </GroupModal>
      {!previewLayout ? (
        <Layout
          primaryHeaderItem={
            <HeaderLink
              href='/'
              label='back'
              primaryItem={true}
            />
          }
        >
          <ContentBox
            title='My Groups'
            pad={{ horizontal: '60px', vertical: '30px' }}
          >
            <MyGroups>
              <GroupCardList groups={groupsSortedByCreatedAt} />
            </MyGroups>
            <CreateButton onClick={() => setGroupModalActive(true)} />
          </ContentBox>
        </Layout>
      ) : (
        <PreviewLayout
          authUser={authUser}
          groups={groupsSortedByCreatedAt}
          loading={userLoading || membershipsLoading}
          setGroupModalActive={setGroupModalActive}
        />
      )}
    </>
  )
}

MyGroupsContainer.propTypes = {
  authUser: shape({
    id: string
  }),
  login: string,
  previewLayout: bool
}

export default MyGroupsContainer
