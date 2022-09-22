import { useState, useEffect } from 'react'
import { string, object, shape } from 'prop-types'
import styled from 'styled-components'
import addQueryParams from '@helpers/addQueryParams'

/** Components */
import NavLink from '@shared/components/NavLink'
import { Anchor, Box } from 'grommet'

const StyledAnchor = styled(Anchor)`
  &:hover {
    text-decoration: none;
  }
`

const AboutNavLink = ({ router, link }) => {
  const [isCurrentPage, setCurrentPage] = useState(false)

  useEffect(() => {
    const { href } = link
    setCurrentPage(router?.asPath === addQueryParams(href))
  }, [router])

  return (
    <Box
      background={isCurrentPage ? 'accent-1' : { light: 'neutral-6', dark: '' }}
      pad={{ horizontal: '20px', vertical: '5px' }}
    >
      <NavLink
        link={link}
        color={{ dark: 'neutral-6', light: 'dark-3' }}
        weight={isCurrentPage ? 'bold' : 'normal'}
        StyledAnchor={StyledAnchor}
      />
    </Box>
  )
}

AboutNavLink.propTypes = {
  link: shape({
    href: string,
    text: string
  }),
  router: object
}

export default AboutNavLink
