import React from 'react'
import AboutNavLink from './AboutNavLink'
import { Nav } from 'grommet'
import { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import { withResponsiveContext } from '@zooniverse/react-components'

function AboutSidebar({ router, screenSize }) {

  const { owner, project } = router.query
  const baseUrl = `/projects/${owner}/${project}/about`

  return (
    <Nav flex direction="column" gap='xsmall'>
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
}

AboutSidebar.propTypes = {
  router: PropTypes.object,
}

export default withResponsiveContext(withRouter(AboutSidebar))
