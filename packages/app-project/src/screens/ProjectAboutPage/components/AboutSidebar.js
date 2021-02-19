import React from 'react'
import NavLink from '@shared/components/NavLink'
import { Nav } from 'grommet'
import { withRouter } from 'next/router'

function AboutSidebar({ router }) {
  const { owner, project } = router.query
  const baseUrl = `/projects/${owner}/${project}/about`

  return (
    <Nav flex direction="column">
      <NavLink link={{ href: `${baseUrl}/research`, text: 'Research' }} color="" weight="" />
      <NavLink link={{ href: `${baseUrl}/team`, text: 'The Team' }} color="" weight="" />
      <NavLink link={{ href: `${baseUrl}/results`, text: 'Results' }} color="" weight="" />
      <NavLink link={{ href: `${baseUrl}/education`, text: 'Education' }} color="" weight="" />
      <NavLink link={{ href: `${baseUrl}/faq`, text: 'FAQ' }} color="" weight="" />
    </Nav>
  )
}

export default withRouter(AboutSidebar)
