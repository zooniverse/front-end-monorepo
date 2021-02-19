import { Box, DropButton, Nav } from 'grommet'
import { FormDown } from 'grommet-icons'
import React, { useState } from 'react'
import { SpacedText } from '@zooniverse/react-components'
import AboutNavLink from './AboutNavLink'
import styled from 'styled-components'
import { arrayOf, shape, string, object } from 'prop-types'
import { withRouter } from 'next/router'

const StyledDropButton = styled(DropButton)``

const AboutDropdownNav = ({ router }) => {
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
      <AboutNavLink
        link={{ href: `${baseUrl}/results`, text: 'results' }}
        router={router}
      />
      <AboutNavLink
        link={{ href: `${baseUrl}/education`, text: 'education' }}
        router={router}
      />
      <AboutNavLink
        link={{ href: `${baseUrl}/faq`, text: 'faq' }}
        router={router}
      />
    </Nav>
  )

  return (
    <StyledDropButton
      isOpen={isOpen}
      alignSelf="center"
      dropContent={dropContent}
      onClose={handleOpen}
      onOpen={handleOpen}
    >
      <Box align="center" direction="row" gap="xsmall" justify="center">
        <SpacedText weight="bold">About</SpacedText>
        <FormDown />
      </Box>
    </StyledDropButton>
  )
}

AboutDropdownNav.propTypes = {
  router: object,
}

export default withRouter(AboutDropdownNav)
