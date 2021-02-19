import React, { useState, useEffect } from 'react'
import NavLink from '@shared/components/NavLink'
import { Anchor, Box } from 'grommet'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import addQueryParams from '@helpers/addQueryParams'

const StyledAnchor = styled(Anchor)`
  &:hover {
    text-decoration: none;
  }
`

const AboutNavLink = ({ router, link }) => {
  const inActiveColor = 'grey'
  const activeColor = 'brand'

  const inActiveWeight = '400'
  const activeWeight = '700'

  const inActiveBg = 'white'
  const activeBg = '#addde0' // lightTeal - add withTheme to use variable names

  const [isCurrentPage, setCurrentPage] = useState(false)

  useEffect(() => {
    const { href } = link
    setCurrentPage(router?.asPath === addQueryParams(href, router))
  }, [router])

  return (
    <Box
      style={{
        background: isCurrentPage ? activeBg : inActiveBg,
        padding: '5px 20px',
      }}
    >
      <NavLink
        link={link}
        color={isCurrentPage ? activeColor : inActiveColor}
        weight={isCurrentPage ? activeWeight : inActiveWeight}
        StyledAnchor={StyledAnchor}
      />
    </Box>
  )
}

AboutNavLink.propTypes = {
  link: PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  router: PropTypes.object,
}

export default AboutNavLink
