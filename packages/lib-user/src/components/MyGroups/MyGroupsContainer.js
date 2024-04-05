'use client'

import { object, string } from 'prop-types'
import { useState } from 'react'

import {
  usePanoptesAuthUser,
  usePanoptesMemberships,
  usePanoptesUser
} from '@hooks'

import { ContentBox, Layout } from '@components/shared'

import { getActiveGroupsWithRoles } from './helpers/getActiveGroupsWithRoles'

import MyGroups from './MyGroups'
import CreateButton from './components/CreateButton'
import GroupCardList from './components/GroupCardList'
import GroupForm from './components/GroupForm'
import GroupModal from './components/GroupModal'

function MyGroupsContainer({
  authClient,
  login
}) {
  const [groupModalActive, setGroupModalActive] = useState(false)

  const {
    data: authUser
  } = usePanoptesAuthUser(authClient)

  const {
    data: user,
    error: userError,
    isLoading: userLoading
  } = usePanoptesUser({
    authClient,
    authUser,
    authUserId: authUser?.id,
    login
  })
  
  const {
    data: membershipsWithGroups,
    error: membershipsError,
    isLoading: membershipsLoading
  } = usePanoptesMemberships({
    authClient,
    authUserId: authUser?.id,
    query: {
      include: 'user_group',
      user_id: user?.id
    }
  })

  const activeGroupsWithRoles = getActiveGroupsWithRoles(membershipsWithGroups)

  return (
    <>
      <GroupModal
        active={groupModalActive}
        handleClose={() => setGroupModalActive(false)}
        title='create new group'
        titleColor='black'
      >
        <GroupForm 
          authClient={authClient}
          authUserId={authUser?.id}
        />
      </GroupModal>
      <Layout>
        <ContentBox
          linkLabel='Learn more about Groups'
          linkProps={{ href: '/groups' }}
          title='My Groups'
          pad={{ horizontal: '60px', vertical: '30px' }}
        >
          <MyGroups>
            <GroupCardList
              authClient={authClient}
              authUserId={authUser?.id}
              groups={activeGroupsWithRoles}
            />
          </MyGroups>
          <CreateButton
            onClick={() => setGroupModalActive(true)}
          />
        </ContentBox>
      </Layout>
    </>
  )
}

MyGroupsContainer.propTypes = {
  authClient: object,
  login: string
}

export default MyGroupsContainer
