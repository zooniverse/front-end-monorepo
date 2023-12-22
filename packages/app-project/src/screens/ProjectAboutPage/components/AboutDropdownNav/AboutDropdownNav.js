import { useState } from 'react'
import { arrayOf, string } from 'prop-types'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import styled, { css, withTheme } from 'styled-components'

import { Box, DropButton, Nav } from 'grommet'
import { FormDown } from 'grommet-icons'
import { SpacedText } from '@zooniverse/react-components'
import AboutNavLink from '../AboutNavLink'

const StyledDropButton = styled(DropButton)`
  border-radius: 2em;
  position: relative;
  min-width: 18rem;

  ${props =>
    props.dark
      ? css`
          box-shadow: 1px 1px 4px black;
        `
      : css`
          box-shadow: 2px 2px 4px ${props.theme.global.colors['light-3']},
            -2px -2px 4px ${props.theme.global.colors['light-3']};
        `}

  &:hover {
    ${props =>
      props.dark
        ? css`
            background: #005d69; // dark teal needs to be added to theme object
          `
        : css`
            background: ${props.theme.global.colors['accent-1']};
          `}
  }

  ${props =>
    props.open &&
    css`
      box-shadow: none;
      background: ${props.theme.global.colors['accent-1']};

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        background: ${props.theme.global.colors.brand};
        height: 50%;
        width: 100%;
        z-index: -1;
      }
    `}
`

const AboutDropContent = ({ aboutNavLinks }) => {
  const router = useRouter()
  const { owner, project } = router.query
  const baseUrl = `/${owner}/${project}/about`

  const { t } = useTranslation('screens')

  return (
    <Nav
      aria-label={t('About.PageNav.title')}
      gap='xsmall'
      background={{ dark: 'dark-5', light: 'neutral-6' }}
    >
      <AboutNavLink
        link={{
          href: `${baseUrl}/research`,
          text: t('About.PageHeading.title.research')
        }}
      />
      <AboutNavLink
        link={{
          href: `${baseUrl}/team`,
          text: t('About.PageHeading.title.team')
        }}
      />
      {aboutNavLinks.includes('results') && (
        <AboutNavLink
          link={{
            href: `${baseUrl}/results`,
            text: t('About.PageHeading.title.results')
          }}
        />
      )}
      {aboutNavLinks.includes('education') && (
        <AboutNavLink
          link={{
            href: `${baseUrl}/education`,
            text: t('About.PageHeading.title.education')
          }}
        />
      )}
      {aboutNavLinks.includes('faq') && (
        <AboutNavLink
          link={{
            href: `${baseUrl}/faq`,
            text: t('About.PageHeading.title.faq')
          }}
        />
      )}
    </Nav>
  )
}

const AboutDropdownNav = ({ aboutNavLinks, theme }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const { t } = useTranslation('screens')

  return (
    <StyledDropButton
      alignSelf='center'
      aria-label={t('About.SidebarHeading')}
      dark={theme?.dark}
      open={isOpen}
      dropAlign={{ top: 'bottom' }}
      dropContent={<AboutDropContent aboutNavLinks={aboutNavLinks} />}
      onClose={handleClose}
      onOpen={handleOpen}
      margin={{ top: '30px' }}
    >
      <Box
        align='center'
        direction='row'
        gap='xsmall'
        justify='center'
        pad={{ horizontal: '20px', vertical: '10px' }}
      >
        <SpacedText weight='bold' color={{ light: 'brand', dark: 'white' }}>
          {t('About.SidebarHeading')}
        </SpacedText>
        <FormDown />
      </Box>
    </StyledDropButton>
  )
}

AboutDropdownNav.propTypes = {
  aboutNavLinks: arrayOf(string)
}

export default withTheme(AboutDropdownNav)
