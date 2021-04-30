import React from 'react'
import AboutNavLink from './AboutNavLink'
import { Nav } from 'grommet'
import { withRouter } from 'next/router'
import { arrayOf, object, string } from 'prop-types'

const AboutSidebar = ({ router, aboutNavLinks }) => {
  const { owner, project } = router.query
  const baseUrl = `/projects/${owner}/${project}/about`

  return (
    <Nav flex direction="column" gap="xsmall">
      {aboutNavLinks.map(link => (
        <AboutNavLink
          key={link}
          link={{
            href: `${baseUrl}/${link}`,
            text: link === 'team' ? 'the team' : link
          }}
          router={router}
        />
      ))}
    </Nav>
  )
}

AboutSidebar.propTypes = {
  aboutNavLinks: arrayOf(string),
  router: object
}

export default withRouter(AboutSidebar)
