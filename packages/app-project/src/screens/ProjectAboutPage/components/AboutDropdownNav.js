import { useState } from 'react'
import { arrayOf, object, string } from 'prop-types'
import { withRouter } from 'next/router'

/** Components */
import { Box, DropButton, Nav } from 'grommet'
import { FormDown } from 'grommet-icons'
import { SpacedText } from '@zooniverse/react-components'
import AboutNavLink from './AboutNavLink'

// this is a separate componenet specifically for testing with enzyme
export const AboutDropContent = ({ aboutNavLinks, router }) => {
  const { owner, project } = router.query
  const baseUrl = `/projects/${owner}/${project}/about`
  
  return (
    <Nav gap='xsmall' background={{ dark: 'dark-3', light: 'neutral-6' }}>
      <AboutNavLink
        link={{ href: `${baseUrl}/research`, text: 'research' }}
        router={router}
      />
      <AboutNavLink
        link={{ href: `${baseUrl}/team`, text: 'the team' }}
        router={router}
      />
      {aboutNavLinks.includes('results') && (
        <AboutNavLink
          link={{
            href: `${baseUrl}/results`,
            text: 'results'
          }}
          router={router}
        />
      )}
      {aboutNavLinks.includes('education') && (
        <AboutNavLink
          link={{
            href: `${baseUrl}/education`,
            text: 'education'
          }}
          router={router}
        />
      )}
      {aboutNavLinks.includes('faq') && (
        <AboutNavLink
          link={{
            href: `${baseUrl}/faq`,
            text: 'faq'
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

  return (
    <DropButton
      isOpen={isOpen}
      alignSelf='center'
      dropContent={
        <AboutDropContent aboutNavLinks={aboutNavLinks} router={router} />
      }
      onClose={handleOpen}
      onOpen={handleOpen}
    >
      <Box align='center' direction='row' gap='xsmall' justify='center'>
        <SpacedText weight='bold' color={{ light: 'black' }}>
          About
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

export { AboutDropdownNav }
export default withRouter(AboutDropdownNav)
