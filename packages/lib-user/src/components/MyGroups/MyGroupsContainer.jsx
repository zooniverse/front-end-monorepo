'use client'

import { SpacedText } from '@zooniverse/react-components'
import { Anchor, Box } from 'grommet'
import { bool, shape, string } from 'prop-types'
import { useState } from 'react'
import { useTranslation } from '@translations/i18n'

import {
  usePanoptesMemberships,
  usePanoptesUser
} from '@hooks'

import {
  ContentBox,
  GroupModal,
  HeaderLink,
  Layout,
  Pagination
} from '@components/shared'

import { getActiveGroupsWithRoles } from './helpers/getActiveGroupsWithRoles.js'

import MyGroups from './MyGroups'
import CreateButton from './components/CreateButton'
import GroupCreateFormContainer from './components/GroupCreateFormContainer'
import PreviewLayout from './components/PreviewLayout'

function MyGroupsContainer({ authUser, login, previewLayout = false }) {
  const { t } = useTranslation()
  const [groupModalActive, setGroupModalActive] = useState(false)
  const [page, setPage] = useState(1)

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
      page,
      user_id: user?.id
    }
  })

  const activeGroupsWithRoles = getActiveGroupsWithRoles(membershipsWithGroups)
  const groupsSortedByCreatedAt = activeGroupsWithRoles.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

  function handleGroupModal() {
    setGroupModalActive(!groupModalActive)
  }

  function handlePageChange({ page }) {
    setPage(page)
  }

  return (
    <>
      <GroupModal
        active={groupModalActive}
        handleClose={handleGroupModal}
        title={t('MyGroups.createNew')}
        titleColor='black'
      >
        <GroupCreateFormContainer />
      </GroupModal>
      {!previewLayout ? (
        <Layout
          primaryHeaderItem={
            <HeaderLink
              href='/'
              label={t('common.back')}
              primaryItem={true}
            />
          }
        >
          <ContentBox
            title={t('MyGroups.title')}
            pad={{ horizontal: '60px', vertical: '30px' }}
          >
            <MyGroups
              error={userError || membershipsError}
              groups={groupsSortedByCreatedAt}
              loading={userLoading || membershipsLoading}
            />
            <Box
              direction='row-responsive'
              justify='between'
              align='center'
            >
              <Anchor
                href='https://blog.zooniverse.org/2024/09/17/launch-news-community-building-pages'
                color={{
                  dark: 'light-4',
                  light: 'dark-5'
                }}
                label={
                  <SpacedText size='1rem' uppercase={false}>
                    {t('MyGroups.learnMore')}
                  </SpacedText>
                }
              />
              <Box
                align='center'
              >
                <Pagination
                  numberItems={membershipsWithGroups?.meta?.memberships?.count}
                  onChange={handlePageChange}
                  page={page}
                  step={membershipsWithGroups?.meta?.memberships?.page_size}
                />
              </Box>
              <Box align='end'>
                <CreateButton onClick={handleGroupModal} />
              </Box>
            </Box>
          </ContentBox>
        </Layout>
      ) : (
        <PreviewLayout
          authUser={authUser}
          groups={groupsSortedByCreatedAt}
          loading={userLoading || membershipsLoading}
          handleGroupModal={handleGroupModal}
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
