'use client'

import { Box } from 'grommet'
import { shape, string } from 'prop-types'
import { useTranslation } from 'react-i18next'

import {
  StickyBox,
  StickySidebar,
  StyledGrid
} from '@components/SharedStyledComponents/SharedStyledComponents'
import DropdownNav from '@components/DropdownNav/DropdownNav'
import FormLayout from '@components/PageLayout/FormLayout'
import MaxWidthContent from '@components/MaxWidthContent/MaxWidthContent'

import SettingsHeading from './components/SettingsHeading/SettingsHeading'
import AccountNameForm from './components/AccountNameForm/AccountNameForm'

import useUserData from './helpers/useUserData'
import updateUserData from './helpers/updateUserData'

function AccountSettings ({
  authUser
}) {
  if (!authUser) return null

  const { data: user, isLoading, error, isValidating, mutate } = useUserData({ login: authUser.login })

  const { t } = useTranslation()

  const ACTIVE_SECTION = 0
  const sidebarSections = [
    { name: t('Settings.AccountSettings.title'), href: '/settings' },
    { name: t('Settings.ProfileSettings.title'), href: '/settings/profile' },
    { name: t('Settings.EmailSettings.title'), href: '/settings/email' }
  ]

  if (isLoading || isValidating) {
    return 'loading...'  // TODO
  }

  if (!user) {
    return 'How did this happen?' // TODO
  }

  if (error) {
    return null  // TODO
  }

  return (
    <FormLayout>

      <StickyBox background={{ dark: 'dark-3', light: 'neutral-6' }}>
        <DropdownNav
          activeSection={ACTIVE_SECTION}
          sidebarLabel={t('Settings.common.sidebar')}
          sections={sidebarSections}
        />
      </StickyBox>

      <StyledGrid>
        <Box as='aside' align='center'>
          <StickySidebar
            activeSection={ACTIVE_SECTION}
            ariaLabel={t('Settings.common.sidebar')}
            sections={sidebarSections}
          />
        </Box>

        <MaxWidthContent
          className='Account-Settings-Page'
          color={{ light: 'black', dark: 'white' }}
        >
          <SettingsHeading section='AccountSettings' />

          <div>
            <h2>DEBUG</h2>
            <p>User: {user?.login}</p>
          </div>

          <AccountNameForm
            user={user}
            mutateUser={mutate}
            updateUserData={updateUserData}
            authUser={authUser}
            isLoading={isLoading}
            isValidating={isValidating}
          />
          
        </MaxWidthContent>
      </StyledGrid>

    </FormLayout>
  )
}

AccountSettings.propTypes = {
  user: shape({
    display_name: string,
    id: string.isRequired,
    login: string,
  })
}

export default AccountSettings
