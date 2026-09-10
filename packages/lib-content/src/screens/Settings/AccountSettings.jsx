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
import SettingsLayout from '@components/PageLayout/SettingsLayout'
import MaxWidthContent from '@components/MaxWidthContent/MaxWidthContent'

import SettingsHeading from './components/SettingsHeading/SettingsHeading'
import AccountNameForm from './components/AccountNameForm/AccountNameForm'

function AccountSettings ({
  user
}) {
  if (!user) return null

  const { t } = useTranslation()

  const activeSection = 0
  const sidebarSections = [
    { name: t('Settings.AccountSettings.title'), href: '/settings' },
    { name: t('Settings.ProfileSettings.title'), href: '/settings/profile' },
    { name: t('Settings.EmailSettings.title'), href: '/settings/email' }
  ]

  return (
    <SettingsLayout>
      <StickyBox background={{ dark: 'dark-3', light: 'neutral-6' }}>
        <DropdownNav
          activeSection={activeSection}
          sidebarLabel={t('Settings.common.sidebar')}
          sections={sidebarSections}
          // setActiveSection={setActiveSection}
        />
      </StickyBox>

      <StyledGrid>
        <Box as='aside' align='center'>
          <StickySidebar
            activeSection={activeSection}
            ariaLabel={t('Settings.common.sidebar')}
            sections={sidebarSections}
            //setActiveSection={setActiveSection}
          />
        </Box>

        <MaxWidthContent
          className='Account-Settings-Page'
          color={{ light: 'black', dark: 'white' }}
        >
          <SettingsHeading section='AccountSettings' />

          <AccountNameForm
            user={user}
          />
        </MaxWidthContent>
      </StyledGrid>


    </SettingsLayout>
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
