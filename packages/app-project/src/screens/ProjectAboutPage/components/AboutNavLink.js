import { useState, useEffect } from 'react'
import { string, object, shape } from 'prop-types'
import styled, { withTheme } from 'styled-components'
import addQueryParams from '@helpers/addQueryParams'

/** Components */
import NavLink from '@shared/components/NavLink'
import { Anchor, Box } from 'grommet'


const StyledBox = styled(Box)`
  padding: 5px 20px;
`

const StyledAnchor = styled(Anchor)`
  &:hover {
    text-decoration: none;
  }
`

const AboutNavLink = ({ router, link, theme }) => {

  const inActiveColor = theme.global.colors['dark-5']
  const activeColor = theme.global.colors['brand']

  const inActiveWeight = 'normal'
  const activeWeight = 'bold'

  const inActiveBg = theme.global.colors['white']
  const activeBg = theme.global.colors['accent-2']

  const [isCurrentPage, setCurrentPage] = useState(false)

  useEffect(() => {
    const { href } = link
    setCurrentPage(router?.asPath === addQueryParams(href, router))
  }, [router])

  return (
    <StyledBox
      style={{
        background: isCurrentPage ? activeBg : inActiveBg,
      }}
    >
      <NavLink
        link={link}
        color={isCurrentPage ? activeColor : inActiveColor}
        weight={isCurrentPage ? activeWeight : inActiveWeight}
        StyledAnchor={StyledAnchor}
      />
    </StyledBox>
  )
}

AboutNavLink.propTypes = {
  link: shape({
    href: string,
    text: string,
  }),
  router: object,
}

export default withTheme(AboutNavLink)
