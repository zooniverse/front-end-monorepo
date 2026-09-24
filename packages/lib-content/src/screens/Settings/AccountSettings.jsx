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

function AccountSettings ({
  authUser
}) {
  if (!authUser) return null

  const { t } = useTranslation()

  const ACTIVE_SECTION = 0
  const sidebarSections = [
    { name: t('Settings.AccountSettings.title'), href: '/settings' },
    { name: t('Settings.ProfileSettings.title'), href: '/settings/profile' },
    { name: t('Settings.EmailSettings.title'), href: '/settings/email' }
  ]

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

          <AccountNameForm
            authUser={authUser}
          />
          
        </MaxWidthContent>
      </StyledGrid>

    </FormLayout>
  )
}

AccountSettings.propTypes = {
  authUser: shape({
    display_name: string,
    id: string.isRequired,
    login: string,
  })
}

export default AccountSettings
