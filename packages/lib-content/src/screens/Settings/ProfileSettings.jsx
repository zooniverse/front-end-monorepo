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
import UserMediaForm from './components/UserMediaForm/UserMediaForm'

const MAX_AVATAR_SIZE = 65536
const MAX_HEADER_SIZE = 256000

function ProfileSettings ({
  authUser
}) {
  if (!authUser) return null

  const { t } = useTranslation()

  const ACTIVE_SECTION = 1
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
          className='Profile-Settings-Page'
          color={{ light: 'black', dark: 'white' }}
        >
          <SettingsHeading section='ProfileSettings' />

          <UserMediaForm
            authUser={authUser}
            makeImageCircular={true}
            maxDataSize={MAX_AVATAR_SIZE}
            mediaType='avatar'
            labels={{
              main: t('Settings.forms.fields.avatar.label'),
              image: t('Settings.forms.fields.avatar.image'),
              body: t('Settings.forms.fields.avatar.body'),
            }}
            optionalRatio={1}
            width='128px'
            height='128px'

            margin={{ bottom: 'small' }}
          />

          <UserMediaForm
            authUser={authUser}
            makeImageCircular={false}
            maxDataSize={MAX_HEADER_SIZE}
            mediaType='profile_header'
            labels={{
              main: t('Settings.forms.fields.profile_header.label'),
              image: t('Settings.forms.fields.profile_header.image'),
              body: t('Settings.forms.fields.profile_header.body'),
            }}
            optionalRatio={false}
            width='800px'
            height='150px'
            margin={{ bottom: 'small' }}
          />
          
        </MaxWidthContent>
      </StyledGrid>

    </FormLayout>
  )
}

ProfileSettings.propTypes = {
  authUser: shape({
    display_name: string,
    id: string.isRequired,
    login: string,
  })
}

export default ProfileSettings
