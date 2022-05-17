import { useState } from 'react'
import { arrayOf, object, string } from 'prop-types'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

/** Components */
import { Box, DropButton, Nav } from 'grommet'
import { FormDown } from 'grommet-icons'
import { SpacedText } from '@zooniverse/react-components'
import AboutNavLink from '../AboutNavLink'

// this is a separate componenet specifically for testing with enzyme
export const AboutDropContent = ({ aboutNavLinks }) => {
  const router = useRouter()
  const { owner, project } = router.query
  const baseUrl = `/${owner}/${project}/about`

  const { t } = useTranslation('screens')

  return (
    <Nav aria-label={t('About.PageNav.title')} gap='xsmall' background={{ dark: 'dark-5', light: 'neutral-6' }}>
      <AboutNavLink
        link={{
          href: `${baseUrl}/research`,
          text: t('About.PageHeading.title.research')
        }}
        router={router}
      />
      <AboutNavLink
        link={{
          href: `${baseUrl}/team`,
          text: t('About.PageHeading.title.team')
        }}
        router={router}
      />
      {aboutNavLinks.includes('results') && (
        <AboutNavLink
          link={{
            href: `${baseUrl}/results`,
            text: t('About.PageHeading.title.results')
          }}
          router={router}
        />
      )}
      {aboutNavLinks.includes('education') && (
        <AboutNavLink
          link={{
            href: `${baseUrl}/education`,
            text: t('About.PageHeading.title.education')
          }}
          router={router}
        />
      )}
      {aboutNavLinks.includes('faq') && (
        <AboutNavLink
          link={{
            href: `${baseUrl}/faq`,
            text: t('About.PageHeading.title.faq')
          }}
          router={router}
        />
      )}
    </Nav>
  )
}

const AboutDropdownNav = ({ aboutNavLinks, router }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(!isOpen)

  const { t } = useTranslation('screens')

  return (
    <DropButton
      aria-label={t('About.SidebarHeading')}
      isOpen={isOpen}
      alignSelf='center'
      dropContent={
        <AboutDropContent aboutNavLinks={aboutNavLinks} router={router} />
      }
      onClose={handleOpen}
      onOpen={handleOpen}
    >
      <Box align='center' direction='row' gap='xsmall' justify='center'>
        <SpacedText weight='bold' color={{ light: 'black', dark: '' }}>
          {t('About.SidebarHeading')}
        </SpacedText>
        <FormDown />
      </Box>
    </DropButton>
  )
}

AboutDropdownNav.propTypes = {
  aboutNavLinks: arrayOf(string),
  router: object
}

export default AboutDropdownNav
