'use client'

import { bool, shape, string } from 'prop-types'
import { useState } from 'react'

import {
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
  adminMode,
  authUser,
  login
}) {
  const [groupModalActive, setGroupModalActive] = useState(false)

  const {
    data: user,
    error: userError,
    isLoading: userLoading
  } = usePanoptesUser({
    adminMode,
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

  return (
    <>
      <GroupModal
        active={groupModalActive}
        handleClose={() => setGroupModalActive(false)}
        title='create new group'
        titleColor='black'
      >
        <GroupForm />
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
  adminMode: bool,
  authUser: shape({
    id: string
  }),
  login: string
}

export default MyGroupsContainer
