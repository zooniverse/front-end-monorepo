'use client'

import { Box, Heading } from 'grommet'
import SettingsLayout from '@components/PageLayout/SettingsLayout'
import MaxWidthContent from '@components/MaxWidthContent/MaxWidthContent'
import { shape, string } from 'prop-types'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import {
  mobileBreakpoint,
  StickyBox,
  StickySidebar,
  StyledGrid
} from '@components/SharedStyledComponents/SharedStyledComponents'
import DropdownNav from '@components/DropdownNav/DropdownNav'

const StyledAboutHeading = styled(Heading)`
  position: relative;
  padding: 44px 0;
  margin: 0;
  text-align: center;

  @media (width <= ${mobileBreakpoint}) {
    display: none;
  }
`

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
          background='#f0e0e0'
        >
          <h1>Account Settings Placeholder</h1>
          <p>User is {user.login} aka {user.display_name}</p>
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
