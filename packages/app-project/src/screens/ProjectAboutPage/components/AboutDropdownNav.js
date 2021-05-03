import { useState } from 'react'
import { arrayOf, object, string } from 'prop-types'
import { withRouter } from 'next/router'

/** Components */
import { Box, DropButton, Nav } from 'grommet'
import { FormDown } from 'grommet-icons'
import { SpacedText } from '@zooniverse/react-components'
import AboutNavLink from './AboutNavLink'

const AboutDropdownNav = ({ aboutNavLinks, router }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(!isOpen)

  const { owner, project } = router.query
  const baseUrl = `/projects/${owner}/${project}/about`

  const dropContent = (
    <Nav gap="xsmall" background="white">
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

  return (
    <DropButton
      isOpen={isOpen}
      alignSelf="center"
      dropContent={dropContent}
      onClose={handleOpen}
      onOpen={handleOpen}
    >
      <Box align="center" direction="row" gap="xsmall" justify="center">
        <SpacedText weight="bold" color="black">
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
