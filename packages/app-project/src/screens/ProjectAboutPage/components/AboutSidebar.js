import React, { useState, useEffect } from 'react'
import NavLink from '@shared/components/NavLink'
import { Nav } from 'grommet'
import { withRouter } from 'next/router'
import addQueryParams from '@helpers/addQueryParams'
import PropTypes from 'prop-types'

function AboutSidebar({ router }) {
  const { owner, project } = router.query
  const baseUrl = `/projects/${owner}/${project}/about`

  return (
    <Nav flex direction="column">
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


const AboutNavLink = ({ router, link }) => {
  const inActiveColor = 'grey'
  const activeColor = 'brand'

  const inActiveWeight = '400'
  const activeWeight = '700'

  const inActiveBg = 'white'
  const activeBg = 'brand'

  const [isCurrentPage, setCurrentPage] = useState(false)

  useEffect(() => {
    const { href } = link
    setCurrentPage(router?.asPath === addQueryParams(href, router))
  }, [router])

  return (
    <NavLink
      link={link}
      color={isCurrentPage ? activeColor : inActiveColor}
      weight={isCurrentPage ? activeWeight : inActiveWeight}
    />
  )
}

AboutNavLink.propTypes = {
  link: PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string
  }).isRequired,
  router: PropTypes.object,
}

export default withRouter(AboutSidebar)
